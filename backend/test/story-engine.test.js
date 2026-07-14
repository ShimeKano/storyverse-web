const test = require('node:test');
const assert = require('node:assert/strict');
const { getStartNode, resolveChoice } = require('../src/utils/story-engine');

const nodes = [
  { id: 1, isStart: true, isEnding: false },
  { id: 2, isStart: false, isEnding: true }
];

const choices = [{ id: 11, nodeId: 1, nextNodeId: 2, choiceText: 'Go' }];

test('getStartNode returns node with attached choices', () => {
  const start = getStartNode(nodes, choices);
  assert.equal(start.id, 1);
  assert.equal(start.choices.length, 1);
});

test('resolveChoice returns next node and attached choices', () => {
  const result = resolveChoice({ nodes, choices, nodeId: 1, choiceId: 11 });
  assert.equal(result.nextNode.id, 2);
  assert.equal(result.nextNode.choices.length, 0);
});
