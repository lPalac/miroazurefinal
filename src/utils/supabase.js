import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  //import.meta.env.VITE_SUPABASE_URL,
  //import.meta.env.VITE_SUPABASE_KEY
  "https://siqbdrtilagiuknevwow.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcWJkcnRpbGFnaXVrbmV2d293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDEyNDcsImV4cCI6MjA2NDk3NzI0N30.22eaCXuRoSB--w4qRDzyK2Kioop091NZ4DT0O8gE9Qk"
);
