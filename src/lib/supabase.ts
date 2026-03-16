import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ztviiyljajgncehpjzib.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_vxLlqRZebsnWMbWGwrNezg_dn9Ae3DW';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
