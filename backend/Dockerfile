# Base image Node.js 20-slim (nhẹ và tương thích tốt)
FROM node:20-slim

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install --omit=dev --legacy-peer-deps

# Sao chép toàn bộ mã nguồn
COPY . .

# Mở cổng cho backend (phụ thuộc vào .env PORT=5001)
EXPOSE 5001

# Lệnh khởi chạy ứng dụng
CMD ["npm", "start"]
