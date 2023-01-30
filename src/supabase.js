import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ljrslkkigkfhssueaqua.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqcnNsa2tpZ2tmaHNzdWVhcXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3NDM0OTIsImV4cCI6MTk5MDMxOTQ5Mn0.LwqnS2yRPS7v7EzRcj62340x31V2UzFYuCt_WJ5MGmY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
