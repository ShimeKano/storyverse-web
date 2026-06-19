const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const auth = require("../middleware/auth");
const manager = require("../middleware/manager"); // Đổi sang gọi manager middleware

// API này cả Admin và Manager đều dùng được để hỗ trợ cấp tim cho người chơi
router.post("/gift-hearts", auth, manager, adminController.giftHeartsToPlayer);

module.exports = router;