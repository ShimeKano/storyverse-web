const authService = require('../services/auth.service');

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.registerUser(req.body);
      res.status(201).json({ message: 'User registered successfully', data: user });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const sessionData = await authService.loginUser(req.body);
      res.status(200).json({ message: 'Login successful', data: sessionData });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
