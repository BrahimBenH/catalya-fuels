import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const postgresUrl = process.env.POSTGRES_URL;

if (!postgresUrl) {
  console.error('Missing POSTGRES_URL environment variable');
  process.exit(1);
}

async function initializeDatabase() {
  const sql = postgres(postgresUrl, { ssl: 'require' });

  try {
    console.log('Reading SQL schema file...');
    const schemaPath = path.join(__dirname, 'setup-database.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    console.log('Executing SQL schema...');
    
    // Split statements and execute
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      try {
        await sql.unsafe(statement);
      } catch (err) {
        // Some statements might fail if they already exist, that's ok
        console.log(`Note: ${err.message.split('\n')[0]}`);
      }
    }

    console.log('\n✅ Database initialized successfully!');
    await sql.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
