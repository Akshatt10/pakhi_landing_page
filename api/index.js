import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is missing.');
} else {
  const sql = neon(process.env.DATABASE_URL);

  app.get('/api/signups', async (req, res) => {
    try {
      const dbResponse = await sql`SELECT COUNT(*) FROM signups`;
      const count = parseInt(dbResponse[0]?.count || "0", 10);
      return res.status(200).json({ count, signups: [] });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to read signups' });
    }
  });

  app.post('/api/signups', async (req, res) => {
    try {
      const { name, age, sex, email, phone } = req.body;
      if (!name || !age || !sex || !email || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const existing = await sql`SELECT id FROM signups WHERE email = ${email.toLowerCase()}`;
      if (existing.length > 0) {
        return res.status(409).json({ error: 'This email is already registered!' });
      }

      await sql`
        INSERT INTO signups (name, age, sex, email, phone)
        VALUES (${name.trim()}, ${parseInt(age)}, ${sex}, ${email.trim().toLowerCase()}, ${phone.trim()})
      `;

      const dbResponse = await sql`SELECT COUNT(*) FROM signups`;
      const totalSignups = parseInt(dbResponse[0]?.count || "0", 10);

      console.log(`✅ New Signup! ${name} (${email}) | Total so far: ${totalSignups}`);
      return res.status(200).json({ success: true, totalSignups });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to save signup.' });
    }
  });
}

// Export the Express API for Vercel
export default app;
