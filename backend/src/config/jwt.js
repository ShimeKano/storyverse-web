require("dotenv").config();

module.exports = {
  secret: process.env.JWT_SECRET || "storyverse_super_secret_key_2026",
  expiresIn: "7d" // Token có hiệu lực trong 7 ngày
};