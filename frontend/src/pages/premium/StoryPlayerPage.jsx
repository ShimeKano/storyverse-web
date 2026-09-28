import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { storyService, getStoryArtwork } from '../../services/storyService';
import { Button, Icon, Progress, Title } from '../../components/premium/Ui';

export default function StoryPlayerPage() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [node, setNode] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([storyService.start(storyId), storyService.get(storyId)]).then(([game, detail]) => { if (active) { setStory(detail || game.story); setNode(game.node); setMessage(''); } }).catch((error) => { if (active) setMessage(error.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [storyId]);

  async function choose(choice) {
    setSelectedChoice(choice.id);
    setLoading(true);
    try {
      const data = await storyService.choose(storyId, node.id, choice.id);
      setNode(data.node);
      setMessage(data.node.isEnding ? `Ending unlocked: ${data.node.endingType || data.node.title}` : 'Progress saved.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSelectedChoice(null);
      setLoading(false);
    }
  }

  if (loading && !node) return <main className="player player-loading"><div className="status-panel"><span className="spinner" /><p>Opening your story path…</p></div></main>;
  if (!node) return <main className="player player-loading"><div className="status-panel"><Title as={1}>Unable to start story</Title><p role="alert">{message}</p><Button onClick={() => navigate(`/stories/${storyId}`)}>Return to story</Button></div></main>;

  const currentSceneIndex = Math.max(0, (story.nodes || []).findIndex((item) => Number(item.id) === Number(node.id)));
  const progress = node.isEnding ? 100 : story.nodes?.length ? Math.round(((currentSceneIndex + 1) / story.nodes.length) * 100) : 0;
  return <main className="player" style={{ backgroundImage: `url(${getStoryArtwork(story)})` }}>
    <div className="player-scrim" />
    <div className="player-top">
      <Button variant="icon" icon="exit" ariaLabel="Return to story details" onClick={() => navigate(`/stories/${storyId}`)} />
      <div className="player-chapter"><span>{story.title}</span><strong>{node.title || 'Current scene'}</strong></div>
      <div className="player-progress"><Progress value={progress} compact label="Story path progress" /><span>{progress}%</span></div>
      <div className="player-tools"><Button variant="ghost" icon="book" onClick={() => navigate(`/stories/${storyId}`)}>Details</Button></div>
    </div>
    <div className="character character-left"><div className="character-silhouette" /><span>STORYVERSE</span></div>
    <div className="character character-right"><div className="character-silhouette second" /><span>YOUR CHOICE</span></div>
    <div className="story-ui" aria-live="polite">
      <div className="choice-prompt"><span className="eyebrow">{node.isEnding ? 'Your ending' : 'A defining choice'}</span><Title as={2}>{node.title || story.title}</Title><p>{node.content}</p></div>
      {!node.isEnding && <div className="choices">{(node.choices || []).map((choice, index) => <button type="button" key={choice.id} className={`choice ${index === 0 ? 'choice-danger' : index === 1 ? 'choice-light' : 'choice-gold'} ${selectedChoice === choice.id ? 'selected' : ''}`} onClick={() => choose(choice)} disabled={loading}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{choice.choiceText}</strong><small>This choice updates your saved story path.</small></div><Icon name={selectedChoice === choice.id ? 'check' : 'arrow'} /></button>)}</div>}
      {node.isEnding && <div className="ending-actions"><Button icon="book" onClick={() => navigate(`/stories/${storyId}`)}>View story details</Button><Button variant="secondary" icon="auto" onClick={() => window.location.reload()}>Explore another path</Button></div>}
      <div className="dialogue"><div className="speaker">{node.isEnding ? node.endingType || 'ENDING' : 'STORY NARRATOR'}</div><p>{message || (node.isEnding ? 'This ending has been recorded in your profile.' : 'Choose carefully. Your progress is saved by StoryVerse.')}</p><span className="continue-mark"><Icon name="chevron" /></span></div>
    </div>
  </main>;
}
