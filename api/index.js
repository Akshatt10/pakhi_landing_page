import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import * as xlsx from 'xlsx';

dotenv.config();
const app = express();

app.use(cors());

// Vercel serverless pre-parses the body; only use express.json() if it hasn't been parsed yet
app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    return next();
  }
  express.json()(req, res, next);
});

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
      const {
        firstName, lastName, email, phone,
        whatBringsYou, ageGroup, mattersMost,
        periodExperience, cycleAwareness
      } = req.body;

      const name = `${firstName} ${lastName || ''}`.trim();

      // Validate required contact fields
      if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required' });
      }

      // Check for duplicates
      const existing = await sql`SELECT id FROM signups WHERE email = ${email.toLowerCase()}`;
      if (existing.length > 0) {
        return res.status(409).json({ error: 'This email is already registered!' });
      }

      // Build JSONB responses object for questionnaire data
      const responses = JSON.stringify({
        whatBringsYou: whatBringsYou || null,
        ageGroup: ageGroup || null,
        mattersMost: mattersMost || [],
        periodExperience: periodExperience || null,
        cycleAwareness: cycleAwareness || null,
      });

      await sql`
        INSERT INTO signups (name, email, phone, responses)
        VALUES (${name.trim()}, ${email.trim().toLowerCase()}, ${phone.trim()}, ${responses}::jsonb)
      `;

      const dbResponse = await sql`SELECT COUNT(*) FROM signups`;
      const totalSignups = parseInt(dbResponse[0]?.count || "0", 10);

      console.log(`✅ New Community Signup! ${name} (${email}) | Total: ${totalSignups}`);
      return res.status(200).json({ success: true, totalSignups });
    } catch (err) {
      console.error('Signup Error:', err);
      return res.status(500).json({ error: 'Failed to save signup.' });
    }
  });

  app.get('/api/export', async (req, res) => {
    try {
      const adminCode = process.env.ADMIN_ACCESS_CODE || 'pakhi123';
      const providedCode = req.headers['x-admin-key'];

      if (providedCode !== adminCode) {
        return res.status(403).json({ error: 'Unauthorized. Invalid access code.' });
      }

      console.log('🔒 Admin triggered Secure Excel Export!');
      
      const rows = await sql`SELECT * FROM signups ORDER BY id ASC`;
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'No signups yet to export.' });
      }

      // Flatten responses JSONB into separate columns for the spreadsheet
      const flatRows = rows.map(row => {
        const r = row.responses || {};
        return {
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          what_brings_you: r.whatBringsYou || '',
          age_group: r.ageGroup || '',
          matters_most: Array.isArray(r.mattersMost) ? r.mattersMost.join(', ') : '',
          period_experience: r.periodExperience || '',
          cycle_awareness: r.cycleAwareness || '',
          created_at: row.created_at,
        };
      });

      // Prepare Excel workbook
      const ws = xlsx.utils.json_to_sheet(flatRows);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "Signups");

      // Generate buffer
      const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

      // Send file
      res.setHeader('Content-Disposition', 'attachment; filename="pakhi-community-signups.xlsx"');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      return res.status(200).send(buffer);
      
    } catch (err) {
      console.error('Export Error:', err);
      return res.status(500).json({ error: 'Failed to generate export file.' });
    }
  });
}

// Export the Express API for Vercel
export default app;
