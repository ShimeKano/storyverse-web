const { AppError } = require('../lib/errors');
const { mutateLocalData } = require('./data.service');
const profileService = require('./profile.service');
const { getStartNode, resolveChoice } = require('../utils/story-engine');

class GameService {
  async startStory(user, storyIdInput) {
    const storyId = Number(storyIdInput);

    await profileService.consumeHeart(user.id);

    return mutateLocalData(async (db) => {
      const story = db.stories.find((item) => item.id === storyId && item.status === 'APPROVED');
      if (!story) {
        throw new AppError('Story not found or not approved', 404);
      }

      const nodes = db.storyNodes.filter((item) => item.storyId === storyId);
      const choices = db.storyChoices.filter((choice) => nodes.some((node) => node.id === choice.nodeId));
      const startNode = getStartNode(nodes, choices);

      const existing = db.progress.find((entry) => entry.userId === user.id && entry.storyId === storyId);
      if (existing) {
        existing.currentNodeId = startNode.id;
        existing.lastPlayedAt = new Date().toISOString();
      } else {
        db.progress.push({
          userId: user.id,
          storyId,
          currentNodeId: startNode.id,
          lastPlayedAt: new Date().toISOString()
        });
      }

      return {
        story,
        node: startNode
      };
    });
  }

  async choose(user, storyIdInput, payload) {
    const storyId = Number(storyIdInput);
    const nodeId = Number(payload.nodeId);
    const choiceId = Number(payload.choiceId);

    if (!Number.isFinite(nodeId) || !Number.isFinite(choiceId)) {
      throw new AppError('nodeId and choiceId are required', 400);
    }

    return mutateLocalData(async (db) => {
      const story = db.stories.find((item) => item.id === storyId && item.status === 'APPROVED');
      if (!story) {
        throw new AppError('Story not found or not approved', 404);
      }

      const nodes = db.storyNodes.filter((item) => item.storyId === storyId);
      const choices = db.storyChoices.filter((choice) => nodes.some((node) => node.id === choice.nodeId));
      const { nextNode } = resolveChoice({ nodes, choices, nodeId, choiceId });

      const progress = db.progress.find((entry) => entry.userId === user.id && entry.storyId === storyId);
      if (progress) {
        progress.currentNodeId = nextNode.id;
        progress.lastPlayedAt = new Date().toISOString();
      } else {
        db.progress.push({
          userId: user.id,
          storyId,
          currentNodeId: nextNode.id,
          lastPlayedAt: new Date().toISOString()
        });
      }

      if (nextNode.rewardExp > 0) {
        const profile = db.profiles.find((entry) => entry.userId === user.id);
        if (profile) {
          profile.exp += nextNode.rewardExp;
          profile.level = 1 + Math.floor(profile.exp / 100);
        }
      }

      if (nextNode.isEnding) {
        const alreadyUnlocked = db.endings.find(
          (entry) => entry.userId === user.id && entry.storyId === storyId && entry.endingType === nextNode.endingType
        );

        if (!alreadyUnlocked) {
          db.endings.push({
            userId: user.id,
            storyId,
            endingType: nextNode.endingType,
            endedAt: new Date().toISOString()
          });
        }
      }

      return {
        storyId,
        node: nextNode
      };
    });
  }
}

module.exports = new GameService();
