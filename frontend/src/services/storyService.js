import { api } from '../api/client';

const artwork = ['/assets/castle.jpg', '/assets/lake.jpg', '/assets/tower.jpg', '/assets/mountain.jpg', '/assets/church.jpg', '/assets/forest.jpg', '/assets/road.jpg', '/assets/water.jpg'];

export function getStoryArtwork(story, index = 0) {
  if (story?.thumbnail) return story.thumbnail;
  const numericId = Number(story?.id);
  const artworkIndex = Number.isFinite(numericId) ? Math.abs(numericId - 1) % artwork.length : index % artwork.length;
  return artwork[artworkIndex];
}

export function getStoryTypeLabel(type) {
  return String(type || 'STORY').replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function toStoryPayload(story) {
  const nodeClientId = new Map((story.nodes || []).map((node) => [node.id, `node-${node.id}`]));
  return {
    title: story.title,
    description: story.description,
    type: story.type,
    status: story.status,
    thumbnail: story.thumbnail || '',
    nodes: (story.nodes || []).map((node) => ({
      clientId: nodeClientId.get(node.id),
      title: node.title || '',
      content: node.content,
      isStart: Boolean(node.isStart),
      isEnding: Boolean(node.isEnding),
      endingType: node.endingType || undefined,
      rewardExp: Number(node.rewardExp || 0),
      choices: (story.choices || [])
        .filter((choice) => choice.nodeId === node.id)
        .map((choice) => ({ text: choice.choiceText, nextClientId: nodeClientId.get(choice.nextNodeId) }))
    }))
  };
}

export const storyService = {
  async list(options = {}) {
    const params = new URLSearchParams();
    if (options.includeOwnDrafts) params.set('includeOwnDrafts', 'true');
    if (options.status) params.set('status', options.status);
    if (options.type) params.set('type', options.type);
    const suffix = params.size ? `?${params}` : '';
    return (await api.get(`/stories${suffix}`)).data || [];
  },
  async get(id) {
    return (await api.get(`/stories/${id}`)).data;
  },
  async start(id) {
    return (await api.get(`/game/${id}/start`)).data;
  },
  async choose(id, nodeId, choiceId) {
    return (await api.post(`/game/${id}/choice`, { nodeId, choiceId })).data;
  },
  async update(id, payload) {
    return (await api.put(`/stories/${id}`, payload)).data;
  },
  async submit(id) {
    return (await api.post(`/stories/${id}/submit`, {})).data;
  }
};
