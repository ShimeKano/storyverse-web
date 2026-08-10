const { getPool } = require('../config/database');

class UserRepository {
  async findByEmail(email) {
    const pool = await getPool();
    if (!pool) return null;

    const result = await pool
      .request()
      .input('email', email)
      .query('SELECT TOP 1 * FROM Users WHERE email = @email');

    return result.recordset[0] || null;
  }

  async create(user) {
    const pool = await getPool();
    if (!pool) return null;

    const result = await pool
      .request()
      .input('username', user.username)
      .input('email', user.email)
      .input('passwordHash', user.passwordHash)
      .input('role', user.role || 'user')
      .query(`
        INSERT INTO Users (username, email, passwordHash, role)
        OUTPUT INSERTED.*
        VALUES (@username, @email, @passwordHash, @role)
      `);

    return result.recordset[0];
  }
}

module.exports = new UserRepository();
