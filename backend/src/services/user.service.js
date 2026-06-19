const { sql, poolPromise } = require("../config/database");
const bcrypt = require("bcryptjs");

class UserService {
  // Lấy toàn bộ danh sách User kèm theo tên Quyền (Dành cho Admin/Manager)
  async getAllUsers() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT u.Id, u.Username, u.Email, u.IsVerified, u.IsBanned, u.CreatedAt, r.Name AS Role
      FROM Users u
      JOIN Roles r ON u.RoleId = r.Id
      ORDER BY u.CreatedAt DESC
    `);
    return result.recordset;
  }

  // Cập nhật trạng thái Khóa/Mở khóa tài khoản user
  async toggleBanUser(targetUserId, isBanned) {
    const pool = await poolPromise;
    await pool.request()
      .input("userId", sql.Int, targetUserId)
      .input("isBanned", sql.Bit, isBanned ? 1 : 0)
      .query("UPDATE Users SET IsBanned = @isBanned WHERE Id = @userId");
    return true;
  }
}

module.exports = new UserService();