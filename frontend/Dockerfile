# Giai đoạn 1: Build React
FROM node:20-slim AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# Truyền URL API thực tế nếu cần hoặc để mặc định (/api) cho Nginx proxy
ARG VITE_API_URL=/api
ARG VITE_AI_URL=/api/ai
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_AI_URL=$VITE_AI_URL

RUN npm run build

# Giai đoạn 2: Serve với Nginx (siêu nhẹ)
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Sao chép file cấu hình nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
