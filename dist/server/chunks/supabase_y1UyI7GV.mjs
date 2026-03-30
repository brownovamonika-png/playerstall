import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "";
const supabaseAnonKey = "";
const isSupabaseConfigured = Boolean(supabaseUrl);
let _supabase = null;
let _supabaseAdmin = null;
if (isSupabaseConfigured) {
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  _supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey);
}
const supabase = _supabase;
const supabaseAdmin = _supabaseAdmin;
const STAGE_LABELS = {
  new_lead: "New Lead",
  consultation: "Consultation",
  quote_sent: "Quote Sent",
  quote_approved: "Quote Approved",
  design_phase: "Design Phase",
  in_production: "In Production",
  quality_check: "Quality Check",
  shipped: "Shipped",
  installed: "Installed",
  complete: "Complete"
};
const STAGE_COLORS = {
  new_lead: "#3b82f6",
  consultation: "#8b5cf6",
  quote_sent: "#f59e0b",
  quote_approved: "#10b981",
  design_phase: "#6366f1",
  in_production: "#fe5900",
  quality_check: "#ec4899",
  shipped: "#14b8a6",
  installed: "#22c55e",
  complete: "#6b7280"
};
const STAGE_ORDER = [
  "new_lead",
  "consultation",
  "quote_sent",
  "quote_approved",
  "design_phase",
  "in_production",
  "quality_check",
  "shipped",
  "installed",
  "complete"
];

export { STAGE_LABELS as S, STAGE_COLORS as a, supabase as b, STAGE_ORDER as c, isSupabaseConfigured as i, supabaseAdmin as s };
