import type { AstroCookies } from 'astro';
import { supabase, isSupabaseConfigured } from './supabase';

const ACCESS_TOKEN_KEY = 'sb-access-token';
const REFRESH_TOKEN_KEY = 'sb-refresh-token';

export async function getSession(cookies: AstroCookies) {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const accessToken = cookies.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookies.get(REFRESH_TOKEN_KEY)?.value;

  if (!accessToken || !refreshToken) {
    return null;
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
    setSessionCookies(cookies, data.session.access_token, data.session.refresh_token);
  }

  return data.session;
}

export function setSessionCookies(cookies: AstroCookies, accessToken: string, refreshToken: string) {
  const cookieOptions = {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  };

  cookies.set(ACCESS_TOKEN_KEY, accessToken, cookieOptions);
  cookies.set(REFRESH_TOKEN_KEY, refreshToken, cookieOptions);
}

export function clearSessionCookies(cookies: AstroCookies) {
  cookies.delete(ACCESS_TOKEN_KEY, { path: '/' });
  cookies.delete(REFRESH_TOKEN_KEY, { path: '/' });
}
