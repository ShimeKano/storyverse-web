const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const authMiddleware = (req, res, next) => {
  // 1. Lấy token từ header "Authorization" (Định dạng chuẩn: Bearer <token>)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2. Giải mã và xác thực tính hợp lệ của token
    const decoded = jwt.verify(token, jwtConfig.secret);

    // 3. Đính kèm thông tin user (id, username, role) vào đối tượng request (req.user)
    // Để các controller phía sau có thể dễ dàng lấy ra sử dụng
    req.user = decoded;

    next(); // Cho phép đi tiếp vào Controller xử lý chính
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid or has expired" });
  }
};

module.exports = authMiddleware;