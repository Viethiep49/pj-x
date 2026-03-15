import { User } from './src/models/index.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

async function resetAdminPassword() {
    try {
        const password_hash = await bcrypt.hash('admin123', 12);
        const [updated] = await User.update(
            { password_hash },
            { where: { email: 'admin@pawsitive.com' } }
        );
        
        if (updated) {
            console.log('✅ Admin password has been reset to: admin123');
        } else {
            console.log('❌ Could not find admin account to reset.');
        }
    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        process.exit();
    }
}

resetAdminPassword();
