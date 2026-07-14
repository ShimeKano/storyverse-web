const { AppError } = require('../lib/errors');

const VALID_ROLES = new Set(['ADMIN', 'MANAGER', 'PLAYER']);
const STORY_TYPES = new Set(['HORROR', 'RPG']);
const STORY_STATUSES = new Set(['DRAFT', 'PENDING', 'APPROVED', 'REJECTED']);

function assert(condition, message, statusCode = 400, details) {
  if (!condition) {
    throw new AppError(message, statusCode, details);
  }
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateEmail(email) {
  const normalized = String(email || '').trim();
  if (!normalized || normalized.length > 254 || normalized.includes(' ')) {
    return false;
  }

  const atIndex = normalized.indexOf('@');
  if (atIndex <= 0 || atIndex !== normalized.lastIndexOf('@')) {
    return false;
  }

  const local = normalized.slice(0, atIndex);
  const domain = normalized.slice(atIndex + 1);
  if (!local || !domain || domain.startsWith('.') || domain.endsWith('.')) {
    return false;
  }

  return domain.includes('.');
}

function normalizeRole(role) {
  const normalized = String(role || 'PLAYER').trim().toUpperCase();
  return VALID_ROLES.has(normalized) ? normalized : 'PLAYER';
}

function validateRegisterInput({ username, email, password }) {
  assert(isNonEmptyString(username), 'Username is required');
  assert(username.length >= 3 && username.length <= 30, 'Username must be 3-30 characters');
  assert(validateEmail(email), 'Email is invalid');
  assert(isNonEmptyString(password), 'Password is required');
  assert(password.length >= 8, 'Password must be at least 8 characters');
}

function validateLoginInput({ usernameOrEmail, password }) {
  assert(isNonEmptyString(usernameOrEmail), 'Username or email is required');
  assert(isNonEmptyString(password), 'Password is required');
}

function validateStoryPayload(payload) {
  assert(isNonEmptyString(payload.title), 'Story title is required');
  assert(payload.title.trim().length <= 255, 'Story title must be <= 255 characters');
  assert(isNonEmptyString(payload.description), 'Story description is required');
  assert(STORY_TYPES.has(String(payload.type || '').toUpperCase()), 'Story type must be HORROR or RPG');
  assert(Array.isArray(payload.nodes) && payload.nodes.length >= 2, 'Story must include at least 2 nodes');

  const startNodeCount = payload.nodes.filter((node) => node.isStart).length;
  assert(startNodeCount === 1, 'Story must include exactly one start node');

  for (const node of payload.nodes) {
    assert(isNonEmptyString(node.clientId), 'Each node must have a clientId');
    assert(isNonEmptyString(node.content), `Node ${node.clientId} must include content`);
    if (node.isEnding) {
      assert(isNonEmptyString(node.endingType), `Ending node ${node.clientId} must include endingType`);
    }

    if (!node.isEnding) {
      assert(Array.isArray(node.choices) && node.choices.length > 0, `Node ${node.clientId} must have choices`);
      for (const choice of node.choices) {
        assert(isNonEmptyString(choice.text), `Node ${node.clientId} has choice without text`);
        assert(isNonEmptyString(choice.nextClientId), `Node ${node.clientId} has choice without nextClientId`);
      }
    }
  }
}

function validateStoryStatus(status) {
  const normalized = String(status || '').toUpperCase();
  assert(STORY_STATUSES.has(normalized), `Invalid story status: ${status}`);
  return normalized;
}

module.exports = {
  VALID_ROLES,
  STORY_TYPES,
  STORY_STATUSES,
  assert,
  isNonEmptyString,
  validateRegisterInput,
  validateLoginInput,
  validateStoryPayload,
  validateStoryStatus,
  normalizeRole
};
