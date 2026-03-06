//supabase logic
import env from "./env.js";
import { createClient } from "@supabase/supabase-js";
export default createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE);
