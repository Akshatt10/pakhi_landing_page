import app from './api/index.js';

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`\n🌸 Pakhi DB Server running LOCALLY at http://localhost:${PORT}`);
    console.log(`🔗 Connected to Neon Postgres via standard Express`);
});
