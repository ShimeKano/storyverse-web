const { AppError } = require('../lib/errors');
const {
  validateStoryPayload,
  validateStoryStatus,
  STORY_TYPES
} = require('../utils/validators');
const { mutateLocalData, getNextId, readLocalData } = require('./data.service');

function sanitizeStorySummary(story) {
  return {
    id: story.id,
    authorId: story.authorId,
    title: story.title,
    description: story.description,
    type: story.type,
    status: story.status,
    thumbnail: story.thumbnail,
    createdAt: story.createdAt,
    updatedAt: story.updatedAt
  };
}

function ensureStoryPermission(user, story, allowManagers = false) {
  if (!user) {
    throw new AppError('Unauthorized', 401);
  }

  if (story.authorId === user.id) {
    return;
  }

  if (allowManagers && (user.role === 'ADMIN' || user.role === 'MANAGER')) {
    return;
  }

  throw new AppError('Forbidden', 403);
}

class StoryService {
  async listStories({ user, type, status, includeOwnDrafts = false } = {}) {
    const db = await readLocalData();
    const normalizedType = type ? String(type).toUpperCase() : null;
    const normalizedStatus = status ? String(status).toUpperCase() : null;

    let stories = db.stories;

    if (normalizedType) {
      if (!STORY_TYPES.has(normalizedType)) {
        throw new AppError('Invalid story type', 400);
      }
      stories = stories.filter((story) => story.type === normalizedType);
    }

    if (normalizedStatus) {
      stories = stories.filter((story) => story.status === normalizedStatus);
    } else if (!user || user.role === 'PLAYER') {
      stories = stories.filter((story) => story.status === 'APPROVED');

      if (includeOwnDrafts && user) {
        const ownDrafts = db.stories.filter((story) => story.authorId === user.id && story.status !== 'APPROVED');
        stories = [...stories, ...ownDrafts];
      }
    }

    return stories
      .map(sanitizeStorySummary)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  async getStoryDetail(id, user) {
    const storyId = Number(id);
    const db = await readLocalData();
    const story = db.stories.find((item) => item.id === storyId);
    if (!story) {
      throw new AppError('Story not found', 404);
    }

    if (story.status !== 'APPROVED' && (!user || (user.id !== story.authorId && user.role === 'PLAYER'))) {
      throw new AppError('Story not available', 403);
    }

    const nodes = db.storyNodes.filter((item) => item.storyId === storyId);
    const choices = db.storyChoices.filter((item) => nodes.some((node) => node.id === item.nodeId));

    return {
      ...sanitizeStorySummary(story),
      nodes,
      choices
    };
  }

  async createStory(author, payload) {
    validateStoryPayload(payload);

    return mutateLocalData(async (db) => {
      const storyId = getNextId(db, 'stories');
      const now = new Date().toISOString();
      const story = {
        id: storyId,
        authorId: author.id,
        title: payload.title.trim(),
        description: payload.description.trim(),
        type: String(payload.type).toUpperCase(),
        status: payload.status ? validateStoryStatus(payload.status) : 'DRAFT',
        thumbnail: typeof payload.thumbnail === 'string' ? payload.thumbnail.trim() : '',
        createdAt: now,
        updatedAt: now
      };

      db.stories.push(story);

      const nodeIdByClientId = new Map();
      for (const node of payload.nodes) {
        const nodeId = getNextId(db, 'storyNodes');
        nodeIdByClientId.set(node.clientId, nodeId);
        db.storyNodes.push({
          id: nodeId,
          storyId,
          title: node.title || '',
          content: node.content,
          isStart: Boolean(node.isStart),
          isEnding: Boolean(node.isEnding),
          endingType: node.isEnding ? String(node.endingType || '').toUpperCase() : null,
          rewardExp: Number(node.rewardExp || 0)
        });
      }

      for (const node of payload.nodes) {
        if (node.isEnding || !Array.isArray(node.choices)) {
          continue;
        }

        for (const choice of node.choices) {
          const nextNodeId = nodeIdByClientId.get(choice.nextClientId);
          if (!nextNodeId) {
            throw new AppError(`Invalid choice target ${choice.nextClientId}`, 400);
          }

          db.storyChoices.push({
            id: getNextId(db, 'storyChoices'),
            nodeId: nodeIdByClientId.get(node.clientId),
            choiceText: choice.text,
            nextNodeId
          });
        }
      }

      return sanitizeStorySummary(story);
    });
  }

  async updateStory(user, storyIdInput, payload) {
    validateStoryPayload(payload);
    const storyId = Number(storyIdInput);

    return mutateLocalData(async (db) => {
      const story = db.stories.find((item) => item.id === storyId);
      if (!story) {
        throw new AppError('Story not found', 404);
      }
      ensureStoryPermission(user, story, true);

      story.title = payload.title.trim();
      story.description = payload.description.trim();
      story.type = String(payload.type).toUpperCase();
      story.thumbnail = typeof payload.thumbnail === 'string' ? payload.thumbnail.trim() : '';
      story.status = payload.status ? validateStoryStatus(payload.status) : story.status;
      story.updatedAt = new Date().toISOString();

      const nodeIds = db.storyNodes.filter((node) => node.storyId === storyId).map((node) => node.id);
      db.storyChoices = db.storyChoices.filter((choice) => !nodeIds.includes(choice.nodeId));
      db.storyNodes = db.storyNodes.filter((node) => node.storyId !== storyId);

      const nodeIdByClientId = new Map();
      for (const node of payload.nodes) {
        const nodeId = getNextId(db, 'storyNodes');
        nodeIdByClientId.set(node.clientId, nodeId);
        db.storyNodes.push({
          id: nodeId,
          storyId,
          title: node.title || '',
          content: node.content,
          isStart: Boolean(node.isStart),
          isEnding: Boolean(node.isEnding),
          endingType: node.isEnding ? String(node.endingType || '').toUpperCase() : null,
          rewardExp: Number(node.rewardExp || 0)
        });
      }

      for (const node of payload.nodes) {
        if (node.isEnding || !Array.isArray(node.choices)) {
          continue;
        }

        for (const choice of node.choices) {
          const nextNodeId = nodeIdByClientId.get(choice.nextClientId);
          if (!nextNodeId) {
            throw new AppError(`Invalid choice target ${choice.nextClientId}`, 400);
          }

          db.storyChoices.push({
            id: getNextId(db, 'storyChoices'),
            nodeId: nodeIdByClientId.get(node.clientId),
            choiceText: choice.text,
            nextNodeId
          });
        }
      }

      return sanitizeStorySummary(story);
    });
  }

  async submitStory(user, storyIdInput) {
    const storyId = Number(storyIdInput);
    return mutateLocalData(async (db) => {
      const story = db.stories.find((item) => item.id === storyId);
      if (!story) {
        throw new AppError('Story not found', 404);
      }

      ensureStoryPermission(user, story);
      story.status = 'PENDING';
      story.updatedAt = new Date().toISOString();
      return sanitizeStorySummary(story);
    });
  }

  async reviewStory(reviewer, storyIdInput, { status }) {
    const storyId = Number(storyIdInput);
    const normalized = validateStoryStatus(status);
    if (!['APPROVED', 'REJECTED'].includes(normalized)) {
      throw new AppError('Review status must be APPROVED or REJECTED', 400);
    }

    if (!reviewer || !['ADMIN', 'MANAGER'].includes(reviewer.role)) {
      throw new AppError('Forbidden', 403);
    }

    return mutateLocalData(async (db) => {
      const story = db.stories.find((item) => item.id === storyId);
      if (!story) {
        throw new AppError('Story not found', 404);
      }

      story.status = normalized;
      story.updatedAt = new Date().toISOString();
      return sanitizeStorySummary(story);
    });
  }

  async removeStory(user, storyIdInput) {
    const storyId = Number(storyIdInput);
    return mutateLocalData(async (db) => {
      const story = db.stories.find((item) => item.id === storyId);
      if (!story) {
        throw new AppError('Story not found', 404);
      }

      ensureStoryPermission(user, story, true);
      if ((user.role === 'PLAYER' || user.role === 'MANAGER') && story.status === 'APPROVED') {
        throw new AppError('Approved story can only be deleted by admin', 403);
      }

      const nodeIds = db.storyNodes.filter((node) => node.storyId === storyId).map((node) => node.id);
      db.storyChoices = db.storyChoices.filter((choice) => !nodeIds.includes(choice.nodeId));
      db.storyNodes = db.storyNodes.filter((node) => node.storyId !== storyId);
      db.progress = db.progress.filter((item) => item.storyId !== storyId);
      db.endings = db.endings.filter((item) => item.storyId !== storyId);
      db.stories = db.stories.filter((item) => item.id !== storyId);

      return true;
    });
  }
}

module.exports = new StoryService();
