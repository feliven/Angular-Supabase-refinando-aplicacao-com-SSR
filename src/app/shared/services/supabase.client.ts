import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';

export const supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
