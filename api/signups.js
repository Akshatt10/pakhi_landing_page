import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // If the DATABASE_URL is somehow missing, return an error gracefully
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'Database environment variable is missing.' });
  }

  const sql = neon(process.env.DATABASE_URL);

  // GET - fetch all signups count
  if (req.method === 'GET') {
    try {
      const dbResponse = await sql`SELECT COUNT(*) FROM signups`;
      const count = parseInt(dbResponse[0]?.count || "0", 10);
      return res.status(200).json({ count, signups: [] }); // We don't expose private data on marketing page load
    } catch (err) {
      console.error('Error fetching count:', err);
      return res.status(500).json({ error: 'Failed to read signups' });
    }
  }

  // POST - add a new signup
  if (req.method === 'POST') {
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

      return res.status(200).json({ success: true, totalSignups });
    } catch (err) {
      console.error('Error saving signup:', err);
      return res.status(500).json({ error: 'Failed to save signup. Your DB table might not be set up.' });
    }
  }

  // Handle any other HTTP methods
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
