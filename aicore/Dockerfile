# Sử dụng Python 3.11 slim để giảm dung lượng image (~800MB -> ~150MB base)
FROM python:3.11-slim

# Thiết lập thư mục làm việc
WORKDIR /app

# Biến môi trường để tối ưu hóa Python trong Docker
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Cài đặt system dependencies cần thiết
# libpq-dev cho PostgreSQL, gcc cho việc compile các package nếu cần, libgl1/libglib cho xử lý ảnh (Pillow/OpenCV)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    gcc \
    libglib2.0-0 \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Sao chép và cài đặt Python dependencies sớm để tận dụng Docker Cache
COPY requirements.txt ./
RUN pip install --no-cache-dir -U pip && \
    pip install --no-cache-dir -r requirements.txt

# Sao chép mã nguồn sau khi cài đặt xong dependencies
COPY . .

# Mở cổng cho AI Core API
EXPOSE 8000

# Lệnh khởi chạy: Chạy schema database rồi bật uvicorn
CMD ["sh", "-c", "python setup_database.py && uvicorn api:app --host 0.0.0.0 --port 8000"]
