import type { Session } from '@supabase/supabase-js';
import type { AstroCookies } from 'astro';
import { supabase, isSupabaseConfigured } from './supabase';

const ACCESS_TOKEN_KEY = 'sb-access-token';
const REFRESH_TOKEN_KEY = 'sb-refresh-token';

/** Default cookie length when session is refreshed (no “remember” context). */
export const CRM_SESSION_DEFAULT_MAX_AGE_SEC = 60 * 60 * 24 * 7;

/**
 * Restore CRM session from cookies. Prefer validating the access JWT with getUser()
 * (reliable on serverless); only call setSession() when refresh is needed — setSession
 * on every request was clearing valid sessions for some Supabase + Vercel setups.
 */
export async function getSession(cookies: AstroCookies): Promise<Session | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const accessToken = cookies.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookies.get(REFRESH_TOKEN_KEY)?.value;

  if (!accessToken || !refreshToken) {
    return null;
  }

  const { data: userData, error: userErr } = await supabase.auth.getUser(accessToken);

  if (!userErr && userData?.user) {
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: userData.user,
    } as Session;
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error || !data.session) {
    cookies.delete(ACCESS_TOKEN_KEY, { path: '/' });
    cookies.delete(REFRESH_TOKEN_KEY, { path: '/' });
    return null;
  }

  if (data.session.access_token !== accessToken) {
    setSessionCookies(cookies, data.session.access_token, data.session.refresh_token, CRM_SESSION_DEFAULT_MAX_AGE_SEC);
  }

  return data.session;
}

export function setSessionCookies(
  cookies: AstroCookies,
  accessToken: string,
  refreshToken: string,
  maxAgeSec: number = CRM_SESSION_DEFAULT_MAX_AGE_SEC,
) {
  const cookieOptions = {
    path: '/',
    httpOnly: true,
    // Match crm-gate: allow cookies over http://localhost during dev (secure-only breaks some local setups).
    secure: import.meta.env.PROD,
    sameSite: 'lax' as const,
    maxAge: maxAgeSec,
  };

  cookies.set(ACCESS_TOKEN_KEY, accessToken, cookieOptions);
  cookies.set(REFRESH_TOKEN_KEY, refreshToken, cookieOptions);
}

export function clearSessionCookies(cookies: AstroCookies) {
  cookies.delete(ACCESS_TOKEN_KEY, { path: '/' });
  cookies.delete(REFRESH_TOKEN_KEY, { path: '/' });
}
