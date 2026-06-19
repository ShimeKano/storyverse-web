const profileService = require("../services/profile.service");

class ProfileController {
  async getMyProfile(req, res, next) {
    try {
      // req.user lấy từ Middleware Auth sau khi giải mã token thành công
      const userId = req.user.id; 

      const profileData = await profileService.getProfileData(userId);

      if (!profileData.profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.status(200).json({
        message: "Get profile successfully! 💖",
        data: profileData
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProfileController();