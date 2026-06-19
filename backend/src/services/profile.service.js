const { sql, poolPromise } = require("../config/database");

class ProfileService {
  // Hàm bổ trợ tự động tính toán và hồi phục Tim theo thời gian
  async refreshUserHearts(pool, userId) {
    const heartResult = await pool.request()
      .input("userId", sql.Int, userId)
      .query("SELECT CurrentHearts, MaxHearts, LastRecoverTime FROM UserHearts WHERE UserId = @userId");

    const heartData = heartResult.recordset[0];
    if (!heartData) return null;

    let { CurrentHearts, MaxHearts, LastRecoverTime } = heartData;

    // Nếu tim đã đầy thì không cần tính toán hồi phục, cập nhật lại mốc thời gian hiện tại
    if (CurrentHearts >= MaxHearts) {
      await pool.request()
        .input("userId", sql.Int, userId)
        .input("now", sql.DateTime, new Date())
        .query("UPDATE UserHearts SET LastRecoverTime = @now WHERE UserId = @userId");
      return { currentHearts: CurrentHearts, maxHearts: MaxHearts };
    }

    const now = new Date();
    const lastRecover = new Date(LastRecoverTime);
    const diffMs = now - lastRecover;
    const diffMinutes = Math.floor(diffMs / (1000 * 60)); // Đổi ra số phút

    const MINUTES_PER_HEART = 15; // Quy định: Cứ 15 phút hồi 1 Tim

    if (diffMinutes >= MINUTES_PER_HEART) {
      const heartsToRecover = Math.floor(diffMinutes / MINUTES_PER_HEART);
      CurrentHearts = Math.min(MaxHearts, CurrentHearts + heartsToRecover);

      // Tính toán mốc thời gian thừa còn lại để làm mốc cho lần hồi tiếp theo
      const remainderMinutes = diffMinutes % MINUTES_PER_HEART;
      const newRecoverTime = new Date(now.getTime() - (remainderMinutes * 60 * 1000));

      await pool.request()
        .input("userId", sql.Int, userId)
        .input("currentHearts", sql.Int, CurrentHearts)
        .input("newRecoverTime", sql.DateTime, newRecoverTime)
        .query(`
          UPDATE UserHearts 
          SET CurrentHearts = @currentHearts, LastRecoverTime = @newRecoverTime 
          WHERE UserId = @userId
        `);
    }

    return { currentHearts: CurrentHearts, maxHearts: MaxHearts };
  }

  // Hàm lấy thông tin Profile chi tiết kết hợp gọi hàm hồi Tim
  async getProfileData(userId) {
    const pool = await poolPromise;

    // 1. Chạy cơ chế tự động hồi Tim trước
    const hearts = await this.refreshUserHearts(pool, userId);

    // 2. Lấy thông tin Profile của User
    const profileResult = await pool.request()
      .input("userId", sql.Int, userId)
      .query(`
        SELECT DisplayName, AvatarUrl, Level, Exp, Gold, Diamond 
        FROM Profiles 
        WHERE UserId = @userId
      `);

    const profile = profileResult.recordset[0];

    return {
      profile,
      hearts
    };
  }
  // Thêm vào trong class ProfileService
async addHearts(userId, amount, allowOverflow = false) {
  const pool = await poolPromise;

  // Lấy trạng thái tim hiện tại
  const result = await pool.request()
    .input("userId", sql.Int, userId)
    .query("SELECT CurrentHearts, MaxHearts FROM UserHearts WHERE UserId = @userId");

  const heartData = result.recordset[0];
  if (!heartData) throw new Error("User hearts record not found");

  let { CurrentHearts, MaxHearts } = heartData;
  let newHearts = CurrentHearts + amount;

  // Nếu xem quảng cáo (không cho phép tràn tim): chặn lại ở MaxHearts
  // Nếu nạp tiền hoặc Admin cấp (allowOverflow = true): cho phép vượt MaxHearts (ví dụ: 99/5 tim)
  if (!allowOverflow && newHearts > MaxHearts) {
    newHearts = MaxHearts;
  }

  await pool.request()
    .input("userId", sql.Int, userId)
    .input("newHearts", sql.Int, newHearts)
    .input("now", sql.DateTime, new Date())
    .query(`
      UPDATE UserHearts 
      SET CurrentHearts = @newHearts, LastRecoverTime = @now 
      WHERE UserId = @userId
    `);

  return { currentHearts: newHearts, maxHearts: MaxHearts };
}
}

module.exports = new ProfileService();