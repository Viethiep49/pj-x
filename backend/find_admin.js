import { User } from './src/models/index.js';
import dotenv from 'dotenv';
dotenv.config();

async function findAdmin() {
    try {
        const admins = await User.findAll({
            where: { role: 'admin' },
            attributes: ['email', 'full_name']
        });
        
        if (admins.length > 0) {
            console.log('Found Admin Accounts:');
            admins.forEach(a => console.log(`- Email: ${a.email} (${a.full_name})`));
        } else {
            console.log('No admin accounts found in database.');
        }
    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        process.exit();
    }
}

findAdmin();
