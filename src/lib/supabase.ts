import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let _supabase: ReturnType<typeof createClient> | null = null;
let _supabaseAdmin: ReturnType<typeof createClient> | null = null;

if (isSupabaseConfigured) {
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);
}

export const supabase = _supabase;
export const supabaseAdmin = _supabaseAdmin;

export type OrderStage =
  | 'new_lead'
  | 'consultation'
  | 'quote_sent'
  | 'quote_approved'
  | 'design_phase'
  | 'in_production'
  | 'quality_check'
  | 'shipped'
  | 'installed'
  | 'complete';

export const STAGE_LABELS: Record<OrderStage, string> = {
  new_lead: 'New Lead',
  consultation: 'Consultation',
  quote_sent: 'Quote Sent',
  quote_approved: 'Quote Approved',
  design_phase: 'Design Phase',
  in_production: 'In Production',
  quality_check: 'Quality Check',
  shipped: 'Shipped',
  installed: 'Installed',
  complete: 'Complete',
};

export const STAGE_COLORS: Record<OrderStage, string> = {
  new_lead: '#3b82f6',
  consultation: '#8b5cf6',
  quote_sent: '#f59e0b',
  quote_approved: '#10b981',
  design_phase: '#6366f1',
  in_production: '#fe5900',
  quality_check: '#ec4899',
  shipped: '#14b8a6',
  installed: '#22c55e',
  complete: '#6b7280',
};

export const STAGE_ORDER: OrderStage[] = [
  'new_lead',
  'consultation',
  'quote_sent',
  'quote_approved',
  'design_phase',
  'in_production',
  'quality_check',
  'shipped',
  'installed',
  'complete',
];

/** Which brand a CRM email template sends as (MailerSend from-address mapping). */
export type EmailSenderCompany = 'playerstall' | 'custom_sport_lockers';

export const EMAIL_SENDER_COMPANY_LABELS: Record<EmailSenderCompany, string> = {
  playerstall: 'PlayerStall',
  custom_sport_lockers: 'Custom Sport Lockers',
};

export function normalizeEmailSenderCompany(
  value: string | null | undefined
): EmailSenderCompany {
  return value === 'custom_sport_lockers' ? 'custom_sport_lockers' : 'playerstall';
}

function crmEnv(key: 'MAILERSEND_FROM_EMAIL' | 'MAILERSEND_FROM_EMAIL_CUSTOM_SPORT_LOCKERS'): string {
  const fromImport = import.meta.env[key];
  if (fromImport) return String(fromImport).trim();
  if (typeof process !== 'undefined' && process.env[key]) return String(process.env[key]).trim();
  return '';
}

/** From address when sending CRM email for this template (verify domain in MailerSend). */
export function getCrmMailerFromEmail(company: EmailSenderCompany | null | undefined): string {
  const c = normalizeEmailSenderCompany(company ?? undefined);
  if (c === 'custom_sport_lockers') {
    return crmEnv('MAILERSEND_FROM_EMAIL_CUSTOM_SPORT_LOCKERS') || 'sales@customsportslockers.com';
  }
  return crmEnv('MAILERSEND_FROM_EMAIL') || 'sales@playerstall.com';
}

export interface Client {
  id: string;
  company_name: string | null;
  contact_name: string;
  email: string | null;
  phone: string | null;
  sport: string | null;
  team_name: string | null;
  notes: string | null;
  /** have_funds | need_funding | fundraising | unsure (room planner) */
  fundraising_status: string | null;
  country: string | null;
  shipping_address: string | null;
  source: string;
  source_website: string | null;
  portal_token: string;
  automation_paused: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  client_id: string;
  title: string;
  description: string | null;
  estimate_number: string | null;
  invoice_number: string | null;
  stage: OrderStage;
  quoted_amount: number | null;
  locker_type: string | null;
  locker_size: string | null;
  locker_width: string | null;
  locker_color: string | null;
  accessories: string | null;
  quantity: number | null;
  assigned_to: string | null;
  estimated_completion: string | null;
  completed_date: string | null;
  created_at: string;
  updated_at: string;
  clients?: Client;
}

export interface Document {
  id: string;
  order_id: string | null;
  client_id: string | null;
  file_name: string;
  file_type: string;
  file_size: number | null;
  storage_path: string;
  doc_type: string;
  uploaded_by: string | null;
  created_at: string;
}

export interface StageHistoryEntry {
  id: string;
  order_id: string;
  from_stage: OrderStage | null;
  to_stage: OrderStage;
  changed_by: string | null;
  notes: string | null;
  client_visible: boolean;
  created_at: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  stage_trigger: OrderStage | null;
  delay_hours: number;
  enabled: boolean;
  company: EmailSenderCompany;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  order_id: string | null;
  client_id: string | null;
  author: string;
  content: string;
  client_visible: boolean;
  created_at: string;
}

export interface Attachment {
  id: string;
  order_id: string | null;
  file_url: string;
  filename: string;
  file_type: string;
  client_visible: boolean;
  uploaded_at: string;
}

export interface Message {
  id: string;
  client_id: string;
  order_id: string | null;
  sender: string;
  content: string;
  read: boolean;
  created_at: string;
}
