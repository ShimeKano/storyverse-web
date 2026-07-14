const { readLocalData } = require('./data.service');

class RankingService {
  async getLeaderboard() {
    const db = await readLocalData();

    const rows = db.users.map((user) => {
      const profile = db.profiles.find((entry) => entry.userId === user.id) || { level: 1, exp: 0 };
      const endingsCount = db.endings.filter((entry) => entry.userId === user.id).length;
      const score = profile.exp + endingsCount * 100;

      return {
        userId: user.id,
        username: user.username,
        role: user.role,
        level: profile.level,
        exp: profile.exp,
        endings: endingsCount,
        score
      };
    });

    return rows.sort((a, b) => b.score - a.score || b.exp - a.exp);
  }
}

module.exports = new RankingService();
