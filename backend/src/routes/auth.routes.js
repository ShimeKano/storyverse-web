const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Route test hiện tại của bạn (GET /api/auth)
router.get("/", (req, res) => {
    res.json({
        message: "Auth route"
    });
});

// Route Đăng ký tài khoản mới (POST /api/auth/register)
router.post("/register", authController.register);
// Route Đăng nhập (POST /api/auth/login)
router.post("/login", authController.login);
module.exports = router;