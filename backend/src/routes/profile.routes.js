const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const auth = require("../middleware/auth"); // Gọi middleware kiểm tra token

// Endpoint GET /api/profile/me (Yêu cầu phải gửi kèm Token hợp lệ ở Header)
router.get("/me", auth, profileController.getMyProfile);

module.exports = router;    