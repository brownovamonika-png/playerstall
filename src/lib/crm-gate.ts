import type { AstroCookies } from 'astro';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { isSupabaseConfigured } from './supabase';

const COOKIE_NAME = 'ps-crm-gate';
const HMAC_SALT = 'playerstall-crm-gate-v1';

/** When set in the environment, all /admin routes (except login/logout) require this password first. */
export function isCrmGateEnabled(): boolean {
  const p = import.meta.env.CRM_SHARED_PASSWORD;
  return typeof p === 'string' && p.length > 0;
}

/**
 * True when /admin must be protected by the CRM shared-password cookie.
 * Same password is required for the optional gate (with Supabase) and for preview mode (without Supabase).
 */
export function isAdminPasswordWallEnabled(): boolean {
  return isCrmGateEnabled() || !isSupabaseConfigured;
}

/** Preview/local CRM without Supabase: wall is on but no password is configured — admin is blocked until .env is set. */
export function isPreviewModeMissingPassword(): boolean {
  return !isSupabaseConfigured && !isCrmGateEnabled();
}

function gateCookieValue(): string {
  const password = String(import.meta.env.CRM_SHARED_PASSWORD || '');
  return createHmac('sha256', HMAC_SALT).update(password).digest('hex');
}

export function verifyGatePasswordSubmitted(submitted: string | null | undefined): boolean {
  if (!isCrmGateEnabled()) return true;
  const expected = String(import.meta.env.CRM_SHARED_PASSWORD || '');
  const got = String(submitted || '');
  const a = Buffer.from(got, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function verifyCrmGateCookie(cookies: AstroCookies): boolean {
  if (!isCrmGateEnabled()) return true;
  const raw = cookies.get(COOKIE_NAME)?.value;
  if (!raw) return false;
  try {
    const want = Buffer.from(gateCookieValue(), 'utf8');
    const got = Buffer.from(raw, 'utf8');
    if (want.length !== got.length) return false;
    return timingSafeEqual(want, got);
  } catch {
    return false;
  }
}

export function setCrmGateCookie(cookies: AstroCookies): void {
  if (!isCrmGateEnabled()) return;
  cookies.set(COOKIE_NAME, gateCookieValue(), {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearCrmGateCookie(cookies: AstroCookies): void {
  cookies.delete(COOKIE_NAME, { path: '/' });
}
