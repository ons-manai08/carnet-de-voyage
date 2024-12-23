import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://pvutfwszayxykfapjntz.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dXRmd3N6YXl4eWtmYXBqbnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3ODk5OTYsImV4cCI6MjA0ODM2NTk5Nn0.HwWFPq9fpC2W-L2ukpgPXEMaUxVc91YQpOJTT-hofVE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  });
