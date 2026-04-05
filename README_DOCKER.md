
1. Tạo 1 file `.env` ở **thư mục gốc ngoài cùng** của dự án (cùng cấp với `docker-compose.yml`).
2. Nhập API Key của Gemini vào nội dung file như sau:
   ```env
   GEMINI_API_KEY=ABCXYZ_Của_Bạn...
   ```

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

