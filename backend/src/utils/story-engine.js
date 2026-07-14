const { AppError } = require('../lib/errors');

function attachChoices(node, choices) {
  return {
    ...node,
    choices: choices.filter((choice) => choice.nodeId === node.id)
  };
}

function getStartNode(nodes, choices) {
  const start = nodes.find((node) => node.isStart);
  if (!start) {
    throw new AppError('Story is missing start node', 500);
  }
  return attachChoices(start, choices);
}

function resolveChoice({ nodes, choices, nodeId, choiceId }) {
  const currentNode = nodes.find((node) => node.id === nodeId);
  if (!currentNode) {
    throw new AppError('Node not found', 404);
  }

  const availableChoices = choices.filter((choice) => choice.nodeId === nodeId);
  const selectedChoice = availableChoices.find((choice) => choice.id === choiceId);
  if (!selectedChoice) {
    throw new AppError('Choice not found for this node', 400);
  }

  const nextNode = nodes.find((node) => node.id === selectedChoice.nextNodeId);
  if (!nextNode) {
    throw new AppError('Next node not found', 500);
  }

  return {
    choice: selectedChoice,
    nextNode: attachChoices(nextNode, choices)
  };
}

module.exports = {
  getStartNode,
  resolveChoice
};
