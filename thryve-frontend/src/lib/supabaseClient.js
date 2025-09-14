import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dtpwpyjtuptldgucioyn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0cHdweWp0dXB0bGRndWNpb3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NzE1MTEsImV4cCI6MjA3MzI0NzUxMX0.FqIGyT8a7_5RK67p7zAYJzJLj50lG0oYR6QzD5Pcwx4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
