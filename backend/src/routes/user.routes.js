const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const manager = require("../middleware/manager"); // Chặn quyền Player, chỉ cho Manager/Admin

// Lấy danh sách toàn bộ User (GET /api/users)
router.get("/", auth, manager, userController.listAllUsers);

// Khóa hoặc mở khóa một User (POST /api/users/ban)
router.post("/ban", auth, manager, userController.updateBanStatus);

module.exports = router;