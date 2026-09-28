import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { getStoryArtwork, storyService, toStoryPayload } from '../../services/storyService';
import { Button, Icon, Logo, Tag, Title } from '../../components/premium/Ui';
import { art } from '../../components/premium/art';

const assetOptions = [art.castle, art.forest, art.lake, art.mountain, art.tower, art.church, art.road, art.water];

export default function CreatorStudioPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [tab, setTab] = useState('Story');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const loadStories = useCallback(async (preferredId) => {
    const result = await storyService.list({ includeOwnDrafts: true });
    const ownStories = result.filter((story) => Number(story.authorId) === Number(user.id));
    setStories(ownStories);
    setSelectedStoryId((current) => preferredId || current || ownStories[0]?.id || null);
  }, [user.id]);

  const loadStory = useCallback(async (id) => {
    if (!id) { setDraft(null); return; }
    const detail = await storyService.get(id);
    setDraft(toStoryPayload(detail));
    setSceneIndex(0);
    setDirty(false);
  }, []);

  useEffect(() => { loadStories().catch((error) => setMessage(error.message)); }, [loadStories]);
  useEffect(() => { loadStory(selectedStoryId).catch((error) => setMessage(error.message)); }, [loadStory, selectedStoryId]);

  const scene = draft?.nodes?.[sceneIndex];
  const endings = useMemo(() => draft?.nodes?.filter((node) => node.isEnding) || [], [draft]);
  const updateScene = (changes) => { setDraft((current) => ({ ...current, nodes: current.nodes.map((node, index) => index === sceneIndex ? { ...node, ...changes } : node) })); setDirty(true); };
  const updateChoice = (choiceIndex, changes) => updateScene({ choices: (scene.choices || []).map((choice, index) => index === choiceIndex ? { ...choice, ...changes } : choice) });

  function addScene() {
    const id = `new-${Date.now()}`;
    setDraft((current) => ({ ...current, nodes: [...current.nodes, { clientId: id, title: 'Untitled scene', content: '', isStart: false, isEnding: false, rewardExp: 0, choices: [] }] }));
    setSceneIndex(draft.nodes.length);
    setDirty(true);
    setMessage('New scene added locally. Save the story to persist it.');
  }

  function addChoice() {
    const target = draft.nodes.find((node, index) => index !== sceneIndex)?.clientId;
    if (!target) { setMessage('Add another scene before linking a choice.'); return; }
    updateScene({ choices: [...(scene.choices || []), { text: 'New choice', nextClientId: target }] });
  }

  async function saveStory() {
    setSaving(true); setMessage('');
    try {
      await storyService.update(selectedStoryId, draft);
      await loadStory(selectedStoryId);
      await loadStories(selectedStoryId);
      setMessage('Story changes saved to StoryVerse.');
    } catch (error) { setMessage(error.message); } finally { setSaving(false); }
  }

  async function publishStory() {
    if (dirty) { setMessage('Save your changes before submitting for review.'); return; }
    setSaving(true);
    try { await storyService.submit(selectedStoryId); await loadStories(selectedStoryId); setMessage('Story submitted for review.'); } catch (error) { setMessage(error.message); } finally { setSaving(false); }
  }

  if (!stories.length) return <main className="creator creator-empty"><div className="status-panel"><Title as={1}>Creator Studio</Title><p>{message || 'Create a story project before opening the studio.'}</p><Button icon="plus" onClick={() => navigate('/upload')}>Create or upload story</Button><Button variant="ghost" onClick={() => navigate('/')}>Back home</Button></div></main>;
  if (!draft) return <main className="creator creator-empty"><div className="status-panel"><span className="spinner" /><p>Loading your story project…</p></div></main>;

  return <main className="creator">
    <aside className="creator-sidebar">
      <button type="button" className="creator-brand" onClick={() => navigate('/')} aria-label="Return to StoryVerse"><Logo compact /><div><span>STORYVERSE STUDIO</span><strong>{draft.title}</strong></div></button>
      <Button variant="secondary" icon="plus" className="new-scene" onClick={addScene}>New scene</Button>
      <div className="side-group"><span>STORY PROJECT</span>{[['book', 'Story map', draft.nodes.length], ['pen', 'Scenes', draft.nodes.length], ['image', 'Assets', assetOptions.length], ['branch', 'Endings', endings.length]].map(([icon, label, count], index) => <button type="button" className={`side-item ${tab === label || (!index && tab === 'Story') ? 'active' : ''}`} key={label} onClick={() => setTab(label)}><Icon name={icon} /><span>{label}</span><small>{count}</small></button>)}</div>
      <div className="side-group"><span>YOUR STORIES</span>{stories.map((story) => <button type="button" className={`side-item ${story.id === selectedStoryId ? 'active' : ''}`} key={story.id} onClick={() => setSelectedStoryId(story.id)}><Icon name="book" /><span>{story.title}</span><small>{story.status}</small></button>)}</div>
      <button type="button" className="sidebar-profile" onClick={() => navigate('/profile')}><img src="/assets/profile.jpg" alt="" /><span><strong>{user.username}</strong><small>{user.role}</small></span><Icon name="settings" /></button>
    </aside>
    <section className="creator-workspace">
      <header className="creator-top"><div><span className="eyebrow">STORY MAP</span><Title as={2}>{draft.title}</Title></div><div className="save-state"><span className={dirty ? 'unsaved-dot' : ''} />{dirty ? 'Unsaved changes' : 'All changes saved'}</div><div className="creator-actions"><Button variant="ghost" icon="play" onClick={() => navigate(`/stories/${selectedStoryId}`)}>Preview</Button><Button variant="secondary" onClick={publishStory} disabled={saving}>Publish</Button><Button icon="save" onClick={saveStory} loading={saving}>Save</Button></div></header>
      <div className="mobile-tabs">{['Story', 'Scenes', 'Assets', 'Endings'].map((item) => <Button variant={tab === item ? 'secondary' : 'ghost'} key={item} onClick={() => setTab(item)}>{item}</Button>)}</div>
      {message && <div className="studio-message" role="status">{message}</div>}
      <div className="workspace-body">
        <div className="graph-panel"><div className="graph-toolbar"><span>{draft.nodes.length} scenes · {endings.length} endings</span><Button variant="ghost" icon="plus" onClick={addScene}>Scene</Button></div><div className="graph-canvas"><div className="graph-orbit" />{draft.nodes.slice(0, 5).map((node, index) => <button type="button" key={node.clientId} className={`node ${index === 0 ? 'start-node' : index === 1 ? 'choice-node' : `branch-node ${['left', 'center', 'right'][index - 2] || 'right'}`} ${sceneIndex === index ? 'selected-node' : ''}`} onClick={() => setSceneIndex(index)}><span>{node.isEnding ? 'ENDING' : node.isStart ? 'START' : `SCENE ${String(index + 1).padStart(2, '0')}`}</span><strong>{node.title || 'Untitled scene'}</strong><small>{node.choices?.length || 0} choices</small></button>)}</div></div>
        <aside className="editor-panel">
          <div className="editor-head"><div><span className="eyebrow">SELECTED SCENE</span><Title as={2}>{scene.title || 'Untitled scene'}</Title></div><Tag>{scene.isEnding ? 'Ending' : scene.isStart ? 'Start' : 'Scene'}</Tag></div>
          <label className="field-label">Scene title<input value={scene.title} onChange={(event) => updateScene({ title: event.target.value })} /></label>
          <label className="field-label">Story cover / visual asset<div className="asset-field"><img src={draft.thumbnail || getStoryArtwork({ id: selectedStoryId })} alt="Selected story artwork" /><span>{draft.thumbnail ? draft.thumbnail.split('/').at(-1) : 'Default StoryVerse artwork'}<small>Persisted as the story thumbnail</small></span></div></label>
          <div className="asset-options" aria-label="Available artwork">{assetOptions.map((asset) => <button type="button" key={asset} className={draft.thumbnail === asset ? 'active' : ''} onClick={() => { setDraft((current) => ({ ...current, thumbnail: asset })); setDirty(true); }}><img src={asset} alt={`Use ${asset.split('/').at(-1)}`} /></button>)}</div>
          <label className="field-label">Dialogue / narration<textarea value={scene.content} onChange={(event) => updateScene({ content: event.target.value })} /></label>
          <label className="field-label checkbox-field"><input type="checkbox" checked={scene.isEnding} disabled={scene.isStart} onChange={(event) => updateScene({ isEnding: event.target.checked, endingType: event.target.checked ? scene.endingType || 'CUSTOM_END' : undefined, choices: event.target.checked ? [] : scene.choices })} />This scene is an ending</label>
          {scene.isEnding && <label className="field-label">Ending type<input value={scene.endingType || ''} onChange={(event) => updateScene({ endingType: event.target.value.toUpperCase().replaceAll(' ', '_') })} /></label>}
          {!scene.isEnding && <div className="choices-editor"><div><span className="field-label">Player choices</span><Button variant="ghost" icon="plus" onClick={addChoice}>Add choice</Button></div>{(scene.choices || []).map((choice, index) => <div className="choice-edit-row" key={`${scene.clientId}-${index}`}><span>{index + 1}</span><input aria-label={`Choice ${index + 1} text`} value={choice.text} onChange={(event) => updateChoice(index, { text: event.target.value })} /><select aria-label={`Choice ${index + 1} destination`} value={choice.nextClientId} onChange={(event) => updateChoice(index, { nextClientId: event.target.value })}>{draft.nodes.filter((node) => node.clientId !== scene.clientId).map((node) => <option key={node.clientId} value={node.clientId}>{node.title || node.clientId}</option>)}</select></div>)}</div>}
          <Button variant="secondary" className="save-scene" icon="save" onClick={saveStory} loading={saving}>Save scene</Button>
        </aside>
      </div>
    </section>
  </main>;
}
