# Hướng dẫn Thay đổi & Tùy chỉnh Đề tài (Customization Guide)

Tài liệu này hướng dẫn bạn cách thay đổi nội dung và giao diện của dự án nếu sau này bạn muốn chuyển sang một đề tài khác (ví dụ: Spa, Nhà hàng, Quán Cafe, v.v.).

---

## 🎨 1. Thay đổi Giao diện & Màu sắc (Theme)

Dự án sử dụng **Tailwind CSS v4** với cấu hình tập trung trong file CSS.

**File cần chỉnh sửa:** `frontend/src/index.css`

*   **Màu sắc:** Tìm khối `@theme` và thay đổi các biến màu như `--color-primary`, `--color-secondary`, `--color-peach`.
*   **Font chữ:** Thay đổi `--font-fredoka` và `--font-nunito`. Đừng quên cập nhật link Google Fonts ở đầu file.
*   **Hiệu ứng Claymorphism:** Nếu muốn chuyển sang phong cách phẳng (flat) hoặc Glassmorphism, hãy điều chỉnh các biến `--shadow-clay-*` và `--radius-clay`.

---

## ✍️ 2. Thay đổi Nội dung & Văn bản (Content)

Nội dung chính của trang web nằm trong các component chức năng.

**File cần chỉnh sửa:** `frontend/src/features/landing/LandingPage.jsx`

*   **Tiêu đề & Mô tả:** Tìm các thẻ `<h1>`, `<h2>`, `<p>` trong phần Hero, Services, và Testimonials.
*   **Gói dịch vụ (Packages):** Thay đổi mảng các gói dịch vụ trong phần "Interactive Package Picker". Bạn có thể sửa tên, giá và các đặc điểm (perks).
*   **Câu hỏi thường gặp/Đánh giá:** Chỉnh sửa mảng `testimonials` ở cuối file.

---

## 🖼️ 3. Thay đổi Hình ảnh & Icon

Dự án sử dụng hình ảnh từ Unsplash và icon từ thư viện `lucide-react`.

**File cần chỉnh sửa:** `frontend/src/features/landing/LandingPage.jsx`

*   **Hình ảnh:** Tìm các thuộc tính `src` trong thẻ `<img>`. Thay thế link Unsplash hiện tại bằng link ảnh mới phù hợp với đề tài của bạn.
*   **Icon:** Dự án sử dụng các icon như `PawPrint`, `Scissors`, `Waves`. Bạn có thể import các icon khác từ `lucide-react` (ví dụ: `Coffee`, `Utensils`, `Music`) và thay thế chúng trong code.

---

## 🏗️ 4. Thay đổi Cấu trúc Layout (Header & Footer)

**File cần chỉnh sửa:**
*   `frontend/src/layouts/MainLayout.jsx`: Chứa khung tổng quát và hiệu ứng chuyển trang.
*   `frontend/src/features/landing/LandingPage.jsx`: Chứa nội dung Header (dạng bong bóng) và Footer chi tiết.

Tại đây, bạn có thể thay đổi tên thương hiệu (Pawsitive), các liên kết điều hướng (Nav links) và thông tin liên hệ ở Footer.

---

## 🔐 5. Thay đổi Trang Đăng nhập & Đăng ký

**File cần chỉnh sửa:**
*   `frontend/src/features/auth/LoginPage.jsx`
*   `frontend/src/features/auth/RegisterPage.jsx`

Thay đổi các câu chào mừng, icon minh họa và màu sắc để đồng bộ với đề tài mới của bạn.

---

## 🚀 Tóm tắt các bước thực hiện:

1.  **Xác định bảng màu mới** và cập nhật trong `index.css`.
2.  **Chuẩn bị bộ ảnh mới** và thay link trong `LandingPage.jsx`.
3.  **Viết lại nội dung văn bản** cho phù hợp với dịch vụ mới.
4.  **Thay thế các Icon** minh họa bằng các icon tương ứng từ thư viện Lucide.
5.  **Kiểm tra lại toàn bộ trang** để đảm bảo tính nhất quán về phong cách.
