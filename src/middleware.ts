import type { MiddlewareHandler } from 'astro';
import { isAdminPasswordWallEnabled, isPreviewModeMissingPassword, verifyCrmGateCookie } from './lib/crm-gate';

function isRoomPlannerPath(pathname: string): boolean {
  return (
    pathname === '/room-planner' ||
    pathname.startsWith('/room-planner/') ||
    pathname.startsWith('/new-room-planner') ||
    pathname.startsWith('/room-planner-v2')
  );
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const path = context.url.pathname;

  if (isRoomPlannerPath(path)) {
    const response = await next();
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    return response;
  }

  if (!path.startsWith('/admin')) {
    return next();
  }

  if (path !== '/admin/login' && path !== '/admin/logout') {
    if (isAdminPasswordWallEnabled()) {
      if (isPreviewModeMissingPassword()) {
        return context.redirect('/admin/login');
      }
      if (!verifyCrmGateCookie(context.cookies)) {
        return context.redirect('/admin/login');
      }
    }
  }

  const response = await next();
  // Avoid stale CRM HTML/data from browser or CDN cache after updates (inventory, pipeline, etc.)
  response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
  return response;
};
