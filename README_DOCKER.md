# 🐳 Hướng dẫn chạy dự án với Docker

## 🚀 Cách khởi động

1.  **Cài đặt Docker**: Đảm bảo máy tính đã cài đặt **Docker Desktop** (cho Windows/Mac) hoặc **Docker Engine** (cho Linux).
2.  **Mở Terminal** tại thư mục gốc của dự án (`pj-x`).
3.  **Chạy lệnh sau**:
    ```bash
    docker-compose up --build -d
    ```
    *   `--build`: Để Docker build lại các image mới cho bạn.
    *   `-d`: Để chạy ngầm (detached mode).

## 📊 Khởi tạo dữ liệu mẫu (Seeding)

Trên máy mới khi chạy lần đầu, Database sẽ trống trơn. Để Dashboard hiện đầy đủ biểu đồ "chuyên nghiệp", bạn hãy chạy lệnh sau:

```bash
docker exec -it pet-grooming-backend npm run seed:heavy
```
*Lưu ý: Bạn chỉ cần chạy lệnh này 1 lần duy nhất.*

## 🌍 Truy cập ứng dụng

Sau khi khởi động thành công, bạn có thể truy cập qua:

*   **Frontend**: `http://localhost` (Cổng 80 mặc định)
*   **Backend API**: `http://localhost:5001/api`
*   **AI Core API**: `http://localhost:8000`

## 🛠️ Một số lệnh hữu ích

*   **Xem trạng thái các container**:
    ```bash
    docker-compose ps
    ```
*   **Xem log của hệ thống**:
    ```bash
    docker-compose logs -f
    ```
*   **Dừng hệ thống**:
    ```bash
    docker-compose down
    ```
*   **Xoá toàn bộ dữ liệu (Reset DB)**:
    ```bash
    docker-compose down -v
    ```

## ⚠️ Lưu ý cho máy yếu
Quá trình build lần đầu tiên cho **AI Core** có thể mất **5-10 phút** vì Docker cần tải và cài đặt bộ thư viện `tensorflow` (~1GB+). Hãy kiên nhẫn đợi nhé!
