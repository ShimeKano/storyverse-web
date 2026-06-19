const authService = require("../services/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      // Validate nhẹ dữ liệu đầu vào
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newUser = await authService.registerUser({ username, email, password });

      res.status(201).json({
        message: "User registered successfully! 🎉",
        data: newUser
      });
    } catch (error) {
      // Đẩy lỗi xuống middleware errorHandler tổng để xử lý gọn gàng
      next(error);
    }
  }
  // Thêm hàm này vào bên trong class AuthController (dưới hàm register)
async login(req, res, next) {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: "Username/Email and password are required" });
    }

    const sessionData = await authService.loginUser({ usernameOrEmail, password });

    res.status(200).json({
      message: "Login successful! 🚀",
      data: sessionData
    });
  } catch (error) {
    // Trả về lỗi 401 nếu sai thông tin đăng nhập, ngược lại trả về lỗi hệ thống 500
    if (error.message.includes("Invalid")) {
      return res.status(401).json({ message: error.message });
    }
    next(error);
  }
}
}

module.exports = new AuthController();