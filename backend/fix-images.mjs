// Temporary fix script — update product image_url in DB
// Run: node fix-images.mjs
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'pet_grooming',
    user: 'postgres',
    password: '123',
});

async function run() {
    const client = await pool.connect();
    try {
        // First, list all products to see what we have
        const { rows } = await client.query('SELECT id, name, image_url FROM products ORDER BY id');
        console.log('Current products:');
        rows.forEach(r => console.log(`  [${r.id}] ${r.name} → ${r.image_url || '(null)'}`));

        // Pet-appropriate Unsplash images by keyword match
        const imageMap = [
            // Dog food
            { pattern: /pedigree|dog food|thức ăn chó/i, url: 'https://images.unsplash.com/photo-1589924691701-f0c578f41d0e?w=400&q=80' },
            // Cat food / Whiskas
            { pattern: /whiskas|cat food|thức ăn mèo|cá ngừ/i, url: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80' },
            // Royal Canin / premium food
            { pattern: /royal canin/i, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80' },
            // Leash / collar / accessories
            { pattern: /dây|leash|collar|dây dắt|dây thắt/i, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80' },
            // Shampoo / grooming
            { pattern: /shampoo|dầu gội|grooming|tắm/i, url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80' },
            // Toys
            { pattern: /toy|đồ chơi|ball/i, url: 'https://images.unsplash.com/photo-1593256206184-5c16d1d3ab56?w=400&q=80' },
            // Bed / cushion
            { pattern: /bed|nệm|cushion|giường/i, url: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400&q=80' },
            // Bowl / feeder
            { pattern: /bowl|bát|feeder/i, url: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80' },
        ];

        // Generic fallbacks by species
        const dogFallback = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80';
        const catFallback = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80';
        const generalFallback = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80';

        let updated = 0;
        for (const row of rows) {
            // Skip if already has a good image (not null, not a loremflickr/mens suit URL)
            const hasBadImage = !row.image_url ||
                row.image_url.includes('loremflickr') ||
                row.image_url.includes('suit') ||
                row.image_url.includes('business');

            if (!hasBadImage) {
                console.log(`  ✓ [${row.id}] ${row.name} — already has image, skipping`);
                continue;
            }

            // Find matching image
            let newUrl = null;
            for (const { pattern, url } of imageMap) {
                if (pattern.test(row.name)) {
                    newUrl = url;
                    break;
                }
            }

            // If no keyword match, check target_species from DB
            if (!newUrl) {
                const detail = await client.query('SELECT target_species FROM products WHERE id = $1', [row.id]);
                const species = detail.rows[0]?.target_species;
                if (species === 'dog') newUrl = dogFallback;
                else if (species === 'cat') newUrl = catFallback;
                else newUrl = generalFallback;
            }

            await client.query('UPDATE products SET image_url = $1 WHERE id = $2', [newUrl, row.id]);
            console.log(`  ✅ Updated [${row.id}] ${row.name} → ${newUrl}`);
            updated++;
        }

        console.log(`\nDone! Updated ${updated} product(s).`);
    } finally {
        client.release();
        await pool.end();
    }
}

run().catch(err => { console.error('Error:', err.message); process.exit(1); });
