const profileService = require('../services/profile.service');

class ProfileController {
  async getMyProfile(req, res, next) {
    try {
      const data = await profileService.getProfileData(req.user.id);
      res.status(200).json({ message: 'Get profile successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async updateMyProfile(req, res, next) {
    try {
      const data = await profileService.updateProfile(req.user.id, req.body);
      res.status(200).json({ message: 'Profile updated successfully', data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProfileController();
