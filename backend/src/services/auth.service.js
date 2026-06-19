const { sql, poolPromise } = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
class AuthService {
  async registerUser({ username, email, password }) {
    const pool = await poolPromise;
    
    // 1. Kiểm tra tài khoản hoặc email đã tồn tại chưa
    const checkUser = await pool.request()
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .query("SELECT Id FROM Users WHERE Username = @username OR Email = @email");

    if (checkUser.recordset.length > 0) {
      throw new Error("Username or Email already exists");
    }

    // 2. Lấy Id của Role "Player" (Giả định trong DB Role Player có tên là 'PLAYER')
    let roleResult = await pool.request()
      .input("roleName", sql.NVarChar, "PLAYER")
      .query("SELECT Id FROM Roles WHERE Name = @roleName");
    
    let roleId = roleResult.recordset[0]?.Id;
    
    // Phòng trường hợp DB chưa có sẵn dữ liệu bảng Roles, ta tự tạo hoặc gán cứng tạm thời
    if (!roleId) {
      const insertRole = await pool.request()
        .input("roleName", sql.NVarChar, "PLAYER")
        .query("INSERT INTO Roles (Name) OUTPUT INSERTED.Id VALUES (@roleName)");
      roleId = insertRole.recordset[0].Id;
    }

    // 3. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Dùng SQL Transaction để đảm bảo tạo đủ User, Profile, Hearts. Lỗi một cái là tự hủy (Rollback)
    const transaction = new sql.Transaction(pool);
    try {
      await transaction.begin();

      // Chèn vào bảng Users
      const userResult = await transaction.request()
        .input("roleId", sql.Int, roleId)
        .input("username", sql.NVarChar, username)
        .input("email", sql.NVarChar, email)
        .input("passwordHash", sql.NVarChar, passwordHash)
        .query(`
          INSERT INTO Users (RoleId, Username, Email, PasswordHash, IsVerified, IsBanned)
          OUTPUT INSERTED.Id
          VALUES (@roleId, @username, @email, @passwordHash, 0, 0)
        `);

      const userId = userResult.recordset[0].Id;

      // Chèn vào bảng Profiles
      await transaction.request()
        .input("userId", sql.Int, userId)
        .input("displayName", sql.NVarChar, username) // Mặc định lấy username làm tên hiển thị
        .query(`
          INSERT INTO Profiles (UserId, DisplayName, Level, Exp, Gold, Diamond)
          VALUES (@userId, @displayName, 1, 0, 0, 0)
        `);

      // Chèn vào bảng UserHearts
      await transaction.request()
        .input("userId", sql.Int, userId)
        .input("now", sql.DateTime, new Date())
        .query(`
          INSERT INTO UserHearts (UserId, CurrentHearts, MaxHearts, LastRecoverTime)
          VALUES (@userId, 5, 5, @now)
        `);

      await transaction.commit();
      return { userId, username, email };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  async loginUser({ usernameOrEmail, password }) {
  const pool = await poolPromise;

  // 1. Tìm User dựa vào Username hoặc Email, đồng thời kéo luôn thông tin Role, Profile và Hearts về bằng JOIN
  const result = await pool.request()
    .input("credential", sql.NVarChar, usernameOrEmail)
    .query(`
      SELECT 
        u.Id, u.Username, u.Email, u.PasswordHash, u.IsBanned,
        r.Name AS Role,
        p.DisplayName, p.AvatarUrl, p.Level, p.Exp, p.Gold, p.Diamond,
        h.CurrentHearts, h.MaxHearts
      FROM Users u
      JOIN Roles r ON u.RoleId = r.Id
      LEFT JOIN Profiles p ON u.Id = p.UserId
      LEFT JOIN UserHearts h ON u.Id = h.UserId
      WHERE u.Username = @credential OR u.Email = @credential
    `);

  const user = result.recordset[0];

  // Kiểm tra tài khoản tồn tại
  if (!user) {
    throw new Error("Invalid username, email or password");
  }

  // Kiểm tra xem trạng thái tài khoản có bị khóa không
  if (user.IsBanned) {
    throw new Error("Your account has been banned");
  }

  // 2. Kiểm tra và đối chiếu mật khẩu
  const isMatch = await bcrypt.compare(password, user.PasswordHash);
  if (!isMatch) {
    throw new Error("Invalid username, email or password");
  }

  // 3. Tạo JWT Token chứa các thông tin cơ bản để phân quyền
  const payload = {
    id: user.Id,
    username: user.Username,
    role: user.Role
  };

  const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

  // 4. Trả về token kèm toàn bộ thông tin trạng thái để Frontend lưu vào Context/Reducer
  return {
    token,
    user: {
      id: user.Id,
      username: user.Username,
      email: user.Email,
      role: user.Role,
      profile: {
        displayName: user.DisplayName,
        avatarUrl: user.AvatarUrl,
        level: user.Level,
        exp: user.Exp,
        gold: user.Gold,
        diamond: user.Diamond
      },
      hearts: {
        current: user.CurrentHearts,
        max: user.MaxHearts
      }
    }
  };
}
}

module.exports = new AuthService();