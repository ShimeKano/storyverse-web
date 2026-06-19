const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Kích hoạt đọc file môi trường khi chạy test

const app = express();

// Cấu hình Middleware cơ bản
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Hỗ trợ đọc form data nếu cần

// ─── ĐƯỜNG DẪN KIỂM TRA HỆ THỐNG ──────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is running",
    time: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.send("Game Web Backend API Running 🚀");
});

// ─── KẾT NỐI ROUTER (Sau này bạn viết code tới đâu thì mở comment tới đó) ───
// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/users", require("./routes/user.routes"));
// app.use("/api/stories", require("./routes/story.routes"));
// app.use("/api/game", require("./routes/game.routes"));

// ─── XỬ LÝ LỖI (ERROR HANDLING) ──────────────────────────────────────
// Middleware xử lý khi không tìm thấy route (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "API Route Not Found" });
});

// Middleware xử lý lỗi hệ thống (500)
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack || err);
  res.status(500).json({ 
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined // Chỉ lộ lỗi chi tiết khi test
  });
});

// ─── KHỞI CHẠY SERVER ────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});