import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
const env = Constants.expoConfig.extra;

export default createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);