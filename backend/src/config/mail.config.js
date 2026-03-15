import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Cấu hình kết nối gửi Email qua chuẩn SMTP (dùng Gmail hoặc các dịch vụ khác)
 * Chú ý: Cấu hình tài khoản email thực tế ở file .env để tránh lộ bảo mật
 */
const transporter = createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT || '587'),
    secure: process.env.MAIL_SECURE === 'true', // true đối với cổng 465, false cho các cổng khác
    auth: {
        user: process.env.MAIL_USER,       // Username (vd: ten.cua.ban@gmail.com)
        pass: process.env.MAIL_PASSWORD,   // App Password (nếu dùng Gmail)
    },
});

/**
 * Hàm hỗ trợ gửi thư tự động
 * @param {Object} options Gồm các field { to, subject, text, html }
 */
export const sendMail = async (options) => {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME || 'Pawsitive Support'}" <${process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        });
        console.log(`[MAIL] Đã gửi mail thành công: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`[MAIL] Lỗi gửi mail: ${error.message}`);
        throw error;
    }
};

export default transporter;
