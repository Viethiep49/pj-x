import pg from 'pg';
const pool = new pg.Pool({ host: 'localhost', port: 5432, database: 'pet_grooming', user: 'postgres', password: '1412Kid@' });
const { rows } = await pool.query("SELECT name, LEFT(image_url, 80) as img FROM products ORDER BY name LIMIT 10");
rows.forEach(r => console.log(r.name, '\n   ->', r.img));
await pool.end();
