/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
	readonly MAILERSEND_FROM_EMAIL?: string;
	readonly MAILERSEND_FROM_EMAIL_CUSTOM_SPORT_LOCKERS?: string;
	/** If set, required to open any /admin page (in addition to Supabase user login when configured). */
	readonly CRM_SHARED_PASSWORD?: string;
}