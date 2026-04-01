# Dùng bản Python 3.11 đầy đủ để đảm bảo đầy đủ thư viện hệ thống cho AI
FROM python:3.11

# Thiết lập thư mục làm việc
WORKDIR /app

# System dependencies cơ bản cho PostgreSQL và Xử lý ảnh
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Sao chép file yêu cầu
COPY requirements.txt ./

# Cài đặt Python dependencies
# Tensorflow rất nặng, bản đầy đủ sẽ giúp quá trình compiled ổn định hơn
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn
COPY . .

# Mở cổng cho AI Core
EXPOSE 8000

# Lệnh khởi chạy: Tự động chạy setup database trước, sau đó bật API uvicorn
CMD python setup_database.py && uvicorn api:app --host 0.0.0.0 --port 8000
