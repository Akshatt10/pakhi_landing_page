import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function clearDB() {
  try {
    console.log('Clearing signups table...');
    await sql`TRUNCATE TABLE signups RESTART IDENTITY;`;
    console.log('✅ Database cleared successfully! Ready for a fresh start.');
  } catch (err) {
    console.error('❌ Error clearing database:', err);
  }
}

clearDB();
