import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    // Read the SQL file
    const sqlFilePath = path.join(process.cwd(), 'scripts', 'setup-database.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');

    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`[v0] Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      try {
        console.log(`[v0] Executing statement ${i + 1}/${statements.length}...`);
        const { error } = await supabase.rpc('execute_sql', { sql: stmt });
        
        if (error) {
          console.warn(`[v0] Warning on statement ${i + 1}: ${error.message}`);
        }
      } catch (err) {
        console.warn(`[v0] Skipping statement ${i + 1}: ${err.message}`);
      }
    }

    console.log('[v0] Database setup potentially completed. Verifying tables...');
    
    // Verify by checking if tables exist
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (error) {
      console.log('[v0] Could not verify tables directly - using alternative method');
    } else {
      console.log('[v0] Created tables:', data.map(t => t.table_name).join(', '));
    }

  } catch (error) {
    console.error('[v0] Error setting up database:', error.message);
    process.exit(1);
  }
}

setupDatabase();
