# Plan: Tích hợp Gợi ý Mua sắm theo Giống thú cưng

## 1. Overview (Tổng quan)
**Mục tiêu**: Khi người dùng ấn "Xem gợi ý mua sắm" sau khi AI nhận diện giống thú cưng thành công, hệ thống cần hiển thị danh sách sản phẩm/dịch vụ được khuyên dùng riêng biệt cho giống đó thay vì hiển thị toàn bộ cửa hàng.
**Lý do**: Cải thiện trải nghiệm cá nhân hóa, tận dụng dữ liệu `breed_recommendations` đã được seed trong database.

## 2. Project Type
**WEB** (Frontend React & Backend Node.js API)

## 3. Success Criteria (Tiêu chí thành công)
- Nút "Xem gợi ý mua sắm" ở `PetScannerPage` truyền thành công thông tin giống (breed name) sang `ShopPage`.
- `ShopPage` tự động lấy được ID của giống (breed ID) từ backend dựa trên tên giống.
- `ShopPage` gọi API `/api/breeds/:id/recommendations` và hiển thị danh sách sản phẩm/dịch vụ ưu tiên cho giống đó.
- Giao diện ShopPage có phần hiển thị thông báo rõ ràng "Gợi ý dành riêng cho giống [Tên Giống]".

## 4. Tech Stack & APIs
- **Frontend Modules**: `react-router-dom` (dùng `searchParams` hoặc `state` trong `useNavigate`).
- **Backend APIs cần dùng**:
  1. `GET /api/breeds?name={breedName}` -> Lấy thông tin breed (kèm `id`).
  2. `GET /api/breeds/{id}/recommendations` -> Lấy danh sách recommendations (products & services) cho breed đó.

## 5. File Structure (Các file bị ảnh hưởng)
- `frontend/src/features/scanner/PetScannerPage.jsx`
- `frontend/src/features/shop/ShopPage.jsx`

## 6. Task Breakdown (Chi tiết công việc)

### Task 1: Truyền dữ liệu giống từ PetScannerPage
- **Agent**: `frontend-specialist`
- **Skill**: `react-best-practices`
- **Mô tả**: Thay đổi sự kiện `onClick` của nút "gợi ý mua sắm".
- **INPUT**: file `PetScannerPage.jsx`, đối tượng `result.breed`.
- **OUTPUT**:
  - Sửa `onClick={() => navigate('/shop')}` thành việc truyền tham số: `onClick={() => navigate(\`/shop?breed=\${encodeURIComponent(result.breed)}\`)}`
- **VERIFY**: Nhấn nút ở Scanner Page -> URL đổi thành `/shop?breed=Tên_Giống`.

### Task 2: Cập nhật ShopPage để nhận tham số và gọi API
- **Agent**: `frontend-specialist`
- **Skill**: `react-best-practices`, `api-patterns`
- **Mô tả**: Đọc URL query `breed`, gọi API breed để lấy ID, sau đó gọi API recommendations.
- **INPUT**: file `ShopPage.jsx`.
- **OUTPUT**:
  - Dùng `useSearchParams` (từ `react-router-dom`) để đọc giá trị `breed`.
  - Viết helper function `fetchRecommendations(breedName)` trong `useEffect`.
  - Nếu `breedName` tồn tại:
    1. Gọi `api.get(\`/breeds?name=\${encodeURIComponent(breedName)}\`)` 
    2. Lấy `breedId` từ kết quả trả về (`res.data.data[0].id`).
    3. Gọi tiếp `api.get(\`/breeds/\${breedId}/recommendations\`)`.
    4. Cập nhật state `products` bằng danh sách sản phẩm lấy từ mảng `recommendations`.
- **VERIFY**: Console mạng hiện 2 request tới API `/breeds` và `/breeds/:id/recommendations`.

### Task 3: Cập nhật Giao diện ShopPage (UI)
- **Agent**: `frontend-specialist`
- **Skill**: `frontend-design`
- **Mô tả**: Thêm phần tiêu đề hoặc badge để user biết họ đang xem gợi ý cho giống của họ.
- **INPUT**: file `ShopPage.jsx`, state lưu tên giống.
- **OUTPUT**:
  - Hiển thị Text "Gợi ý nổi bật cho giống: [Tên Giống]" ở phần trên cùng của Product Grid (nếu có querystring `breed`).
  - Nút "Xóa bộ lọc" để user quay về xem toàn bộ sản phẩm bằng cách clear URL params.
- **VERIFY**: UI trực quan, hiển thị đúng tên giống và các thẻ sản phẩm tương ứng.

## 7. Phase X: Verification Checklist
- [ ] Chạy `npm run lint` trên frontend không có lỗi liên quan.
- [ ] Test luồng thủ công từ Scan ảnh -> Xem gợi ý.
- [ ] Đảm bảo fallback tốt nếu API không tìm thấy giống, hệ thống tự động tải lại các sản phẩm mặc định.
