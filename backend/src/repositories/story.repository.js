const { getPool } = require('../config/database');

class StoryRepository {
  async findAll() {
    const pool = await getPool();
    if (!pool) return [];

    const result = await pool
      .request()
      .query('SELECT * FROM Stories ORDER BY createdAt DESC');

    return result.recordset;
  }

  async findById(id) {
    const pool = await getPool();
    if (!pool) return null;

    const result = await pool
      .request()
      .input('id', id)
      .query('SELECT TOP 1 * FROM Stories WHERE id = @id');

    return result.recordset[0] || null;
  }
}

module.exports = new StoryRepository();
