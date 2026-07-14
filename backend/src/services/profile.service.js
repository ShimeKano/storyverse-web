const env = require('../config/env');
const { AppError } = require('../lib/errors');
const { mutateLocalData } = require('./data.service');

function recoverHearts(hearts) {
  const now = new Date();
  const lastRecover = new Date(hearts.lastRecoverTime || now);
  const elapsedMinutes = Math.floor((now - lastRecover) / 60000);

  if (hearts.currentHearts >= hearts.maxHearts) {
    hearts.lastRecoverTime = now.toISOString();
    return hearts;
  }

  if (elapsedMinutes >= env.HEART_RECOVER_MINUTES) {
    const recovered = Math.floor(elapsedMinutes / env.HEART_RECOVER_MINUTES);
    hearts.currentHearts = Math.min(hearts.maxHearts, hearts.currentHearts + recovered);
    const remainder = elapsedMinutes % env.HEART_RECOVER_MINUTES;
    hearts.lastRecoverTime = new Date(now.getTime() - remainder * 60000).toISOString();
  }

  return hearts;
}

class ProfileService {
  async getProfileData(userId) {
    return mutateLocalData(async (db) => {
      const profile = db.profiles.find((item) => item.userId === userId);
      const hearts = db.hearts.find((item) => item.userId === userId);
      if (!profile || !hearts) {
        throw new AppError('Profile not found', 404);
      }

      const inventory = db.inventory.filter((item) => item.userId === userId);
      const progress = db.progress.filter((item) => item.userId === userId);
      const endings = db.endings.filter((item) => item.userId === userId);

      return {
        profile,
        hearts: recoverHearts(hearts),
        inventory,
        progress,
        endings
      };
    });
  }

  async updateProfile(userId, payload) {
    return mutateLocalData(async (db) => {
      const profile = db.profiles.find((item) => item.userId === userId);
      if (!profile) {
        throw new AppError('Profile not found', 404);
      }

      if (typeof payload.displayName === 'string' && payload.displayName.trim()) {
        profile.displayName = payload.displayName.trim();
      }

      if (typeof payload.avatarUrl === 'string') {
        profile.avatarUrl = payload.avatarUrl.trim();
      }

      return profile;
    });
  }

  async consumeHeart(userId) {
    return mutateLocalData(async (db) => {
      const hearts = db.hearts.find((item) => item.userId === userId);
      if (!hearts) {
        throw new AppError('Heart data not found', 404);
      }

      recoverHearts(hearts);
      if (hearts.currentHearts <= 0) {
        throw new AppError('Not enough hearts. Wait for recovery.', 400);
      }

      hearts.currentHearts -= 1;
      hearts.lastRecoverTime = new Date().toISOString();
      return hearts;
    });
  }

  async addHearts(userId, amount, allowOverflow = false) {
    return mutateLocalData(async (db) => {
      const hearts = db.hearts.find((item) => item.userId === Number(userId));
      if (!hearts) {
        throw new AppError('Heart data not found', 404);
      }

      const parsedAmount = Number(amount);
      if (!Number.isFinite(parsedAmount) || parsedAmount === 0) {
        throw new AppError('Invalid amount', 400);
      }

      hearts.currentHearts += parsedAmount;
      if (!allowOverflow) {
        hearts.currentHearts = Math.min(hearts.currentHearts, hearts.maxHearts);
      }
      hearts.currentHearts = Math.max(0, hearts.currentHearts);
      hearts.lastRecoverTime = new Date().toISOString();
      return hearts;
    });
  }

  async addExp(userId, expReward) {
    return mutateLocalData(async (db) => {
      const profile = db.profiles.find((item) => item.userId === userId);
      if (!profile) {
        throw new AppError('Profile not found', 404);
      }

      profile.exp += expReward;
      profile.level = 1 + Math.floor(profile.exp / 100);
      return profile;
    });
  }
}

module.exports = new ProfileService();
