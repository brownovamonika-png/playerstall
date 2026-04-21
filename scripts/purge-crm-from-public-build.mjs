#!/usr/bin/env node
/**
 * Purge CRM (/admin/*, /my-project/*) routes and serverless functions from
 * the Vercel build output. Runs automatically after `astro build` via the
 * npm `postbuild` lifecycle.
 *
 * No-op unless DEPLOY_TARGET=public. The CRM subdomain project leaves that
 * variable unset and keeps the full build.
 *
 * Why: CRM pages use `export const prerender = false` and become Vercel
 * serverless functions. Filtering them inside astro.config.mjs only affects
 * the in-memory routes list — the Vercel adapter still emits handlers in
 * .vercel/output/_functions/pages/ and adds entries to config.json. We clean
 * both up here.
 */
import { rm, readFile, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const DEPLOY_TARGET = (process.env.DEPLOY_TARGET || '').trim();

if (DEPLOY_TARGET !== 'public') {
  // Silent no-op for the CRM subdomain build and local dev builds.
  process.exit(0);
}

const outDir = path.join(projectRoot, '.vercel', 'output');
const distDir = path.join(projectRoot, 'dist');

if (!existsSync(outDir)) {
  console.log('[purge-crm] .vercel/output not found; nothing to purge.');
  process.exit(0);
}

/** Delete if present, ignore if missing. */
async function removePath(p) {
  try {
    await rm(p, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

const targets = [
  // Serverless function handlers for admin + my-project.
  path.join(outDir, '_functions', 'pages', 'admin'),
  path.join(outDir, '_functions', 'pages', 'admin.astro.mjs'),
  path.join(outDir, '_functions', 'pages', 'my-project'),
  path.join(outDir, '_functions', 'pages', 'my-project.astro.mjs'),
  // Any static fallthrough (normally empty because SSR, but defensive).
  path.join(outDir, 'static', 'admin'),
  path.join(outDir, 'static', 'my-project'),
  path.join(distDir, 'client', 'admin'),
  path.join(distDir, 'client', 'my-project'),
  path.join(distDir, 'server', 'pages', 'admin'),
  path.join(distDir, 'server', 'pages', 'my-project'),
];

let removedCount = 0;
for (const t of targets) {
  if (await exists(t)) {
    await removePath(t);
    removedCount++;
    console.log(`[purge-crm] removed ${path.relative(projectRoot, t)}`);
  }
}

// Rewrite .vercel/output/config.json to drop /admin and /my-project routes.
const configPath = path.join(outDir, 'config.json');
if (await exists(configPath)) {
  const raw = await readFile(configPath, 'utf8');
  const config = JSON.parse(raw);

  const isCrmRoute = (entry) => {
    if (!entry || typeof entry !== 'object') return false;
    const src = typeof entry.src === 'string' ? entry.src : '';
    return (
      src.includes('/admin/') ||
      src.includes('/admin\\') ||
      src === '^/admin/?$' ||
      src === '^/admin$' ||
      src.includes('/my-project/') ||
      src.includes('/my-project\\') ||
      src === '^/my-project/?$'
    );
  };

  if (Array.isArray(config.routes)) {
    const before = config.routes.length;
    config.routes = config.routes.filter((r) => !isCrmRoute(r));
    const removedRoutes = before - config.routes.length;
    if (removedRoutes > 0) {
      await writeFile(configPath, JSON.stringify(config, null, '\t') + '\n');
      console.log(`[purge-crm] stripped ${removedRoutes} CRM route(s) from config.json`);
    }
  }
}

console.log(
  removedCount > 0
    ? `[purge-crm] done (DEPLOY_TARGET=public) — purged ${removedCount} path(s).`
    : '[purge-crm] done (DEPLOY_TARGET=public) — nothing to remove.'
);
