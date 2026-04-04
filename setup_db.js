import { neon } from '@neondatabase/serverless';

// Run this using: node setup_db.js "your_neon_connection_string"
const connectionString = process.argv[2];

if (!connectionString) {
  console.error('\n❌ ERROR: Please provide your Neon connection string as a parameter.');
  console.log('Example: node setup_db.js "postgresql://neondb_owner:password@ep-db.neon.tech/neondb?sslmode=require"\n');
  process.exit(1);
}

const sql = neon(connectionString);

async function setup() {
  console.log('Connecting to Neon DB...');
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS signups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER NOT NULL,
        sex VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('\n✅ Success! Table "signups" created (or already existed).');
    console.log('Your database is now ready for production!\n');
  } catch (err) {
    console.error('\n❌ Failed to setup database table:', err.message, '\n');
  }
}

setup();
