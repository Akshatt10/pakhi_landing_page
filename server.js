import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Logger middleware to show all incoming requests in the CLI
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// If the DATABASE_URL is somehow missing, fail fast
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL environment variable is missing.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

// GET - fetch all signups count
app.get('/api/signups', async (req, res) => {
  try {
    const dbResponse = await sql`SELECT COUNT(*) FROM signups`;
    const count = parseInt(dbResponse[0]?.count || "0", 10);
    return res.status(200).json({ count, signups: [] });
  } catch (err) {
    console.error('Error fetching count:', err);
    return res.status(500).json({ error: 'Failed to read signups' });
  }
});

// POST - add a new signup
app.post('/api/signups', async (req, res) => {
  try {
    const { name, age, sex, email, phone } = req.body;

    // Basic validation
    if (!name || !age || !sex || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check duplicate email
    const existing = await sql`SELECT id FROM signups WHERE email = ${email.toLowerCase()}`;
    if (existing.length > 0) {
      return res.status(409).json({ error: 'This email is already registered!' });
    }

    // Insert new row
    await sql`
      INSERT INTO signups (name, age, sex, email, phone)
      VALUES (${name.trim()}, ${parseInt(age)}, ${sex}, ${email.trim().toLowerCase()}, ${phone.trim()})
    `;

    // Get updated total count
    const dbResponse = await sql`SELECT COUNT(*) FROM signups`;
    const totalSignups = parseInt(dbResponse[0]?.count || "0", 10);

    console.log(`✅ New Signup! ${name} (${email}) | Total so far: ${totalSignups}`);
    return res.status(200).json({ success: true, totalSignups });
  } catch (err) {
    console.error('Error saving signup:', err);
    return res.status(500).json({ error: 'Failed to save signup. Your DB table might not be set up.' });
  }
});

app.listen(PORT, () => {
    console.log(`\n🌸 Pakhi DB Server running at http://localhost:${PORT}`);
    console.log(`🔗 Connected to Neon Postgres`);
});
