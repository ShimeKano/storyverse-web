const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { validateStoryPayload } = require('../src/utils/validators');

test('project17 sample is a valid StoryVerse upload payload', () => {
  const samplePath = path.join(__dirname, '../../frontend/public/samples/project17.json');
  const payload = JSON.parse(fs.readFileSync(samplePath, 'utf8'));

  assert.doesNotThrow(() => validateStoryPayload(payload));
  assert.equal(payload.type, 'HORROR');
  assert.equal(payload.nodes.filter((node) => node.isStart).length, 1);
  assert.equal(payload.nodes.filter((node) => node.isEnding).length, 3);
});
