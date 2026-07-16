# StoryVerse Web

Interactive Horror & RPG Story Platform với các khu vực:

- Đăng tải truyện/chapter/asset (JSON story graph)
- Phần chơi (interactive choices + nhiều ending)
- Bảng xếp hạng
- Thông tin người chơi (profile/progress/inventory)
- Admin / Manager only (duyệt truyện, quản lý user)

## Kiến trúc

- **Frontend:** React + Vite (`/frontend`)
- **Backend API:** Node.js + Express (`/backend`)
- **Data provider:**
  - Local JSON (mặc định, chạy ngay)
  - Azure SQL (đã có config + service layer fallback)
- **Azure readiness:** Env config cho Azure SQL / Blob Storage / Cosmos DB

## Chạy local

### 1) Backend

```bash
cd backend
cp .env.example .env
npm ci
npm run dev
```

Backend chạy tại `http://localhost:5000`

### 2) Frontend

```bash
cd frontend
cp .env.example .env
npm ci
npm run dev
```

Frontend chạy tại `http://localhost:5173`

## Tài khoản seed mẫu

Dữ liệu seed nằm ở: `backend/src/data/local-db.json`

- `admin / Password123!` (ADMIN)
- `manager / Password123!` (MANAGER)
- `player / Password123!` (PLAYER)

Story mẫu hoàn chỉnh:
- **Cánh Cửa Đêm Mưa** (nhiều lựa chọn, nhiều ending)

## Cấu hình môi trường

### Backend `.env`

- `DATA_PROVIDER=local` để chạy local JSON fallback.
- Để dùng Azure SQL:
  1. Đặt `DATA_PROVIDER=azure`
  2. Đặt `AZURE_SQL_ENABLED=true`
  3. Cấu hình đủ `AZURE_SQL_SERVER`, `AZURE_SQL_DATABASE`, `AZURE_SQL_USER`, `AZURE_SQL_PASSWORD`

Nếu Azure SQL lỗi hoặc thiếu config, backend tự fallback sang local store.

### Frontend `.env`

- `VITE_API_BASE_URL=http://localhost:5000/api`

## Kết nối CSDL ở implementation hiện tại

- Mặc định: đọc/ghi từ `backend/src/data/local-db.json`
- Azure: service layer có trong `backend/src/config/database.js` + `backend/src/config/azure.js`
- Có thể migrate dữ liệu local sang Azure SQL bằng schema ở `database/schema.sql`

## Azure setup từng bước

1. Tạo Azure SQL Database + firewall rule cho app host.
2. Import schema từ `database/schema.sql`.
3. (Tùy chọn) Tạo Azure Storage account và container `story-assets`.
4. Cập nhật `.env` backend bằng thông số Azure.
5. Deploy backend (App Service) + frontend (Static Web Apps).
6. Kiểm tra `GET /health` để xác nhận runtime config.

## Route guards và phân quyền

- Frontend:
  - `ProtectedRoute`: yêu cầu login
  - `RoleRoute`: chặn theo role (`ADMIN`, `MANAGER`)
- Backend:
  - `authRequired`
  - `manager` middleware (ADMIN/MANAGER only)
  - `admin` middleware (ADMIN only)

## Checklist kiểm thử nhanh

1. Login bằng `player`
2. Vào **Phần chơi** và hoàn thành story mẫu tới ending
3. Vào **Thông tin người chơi** kiểm tra hearts/exp/endings
4. Vào **Đăng tải** tạo truyện mới và gửi duyệt
5. Login `manager` duyệt truyện ở **Admin/Manager**
6. Mở **Bảng xếp hạng** kiểm tra score cập nhật

## Lệnh kiểm tra chất lượng

```bash
cd backend && npm test
cd frontend && npm run build
```

## Bảo mật

- Không hardcode secrets
- Token JWT từ env (`JWT_SECRET`)
- Input validation ở service layer
- Error handling thống nhất qua middleware
