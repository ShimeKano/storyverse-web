import { useLoaderData, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { getStoryArtwork, getStoryTypeLabel } from '../../services/storyService';
import { Button, Icon, Progress, SectionHeader, Tag, Title } from '../../components/premium/Ui';

export default function StoryDetailPage() {
  const story = useLoaderData();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const choicesByNode = new Map((story.nodes || []).map((node) => [node.id, (story.choices || []).filter((choice) => choice.nodeId === node.id)]));
  const endings = (story.nodes || []).filter((node) => node.isEnding);
  const startStory = () => navigate(isAuthenticated ? `/stories/${story.id}/play` : '/login', { state: { from: `/stories/${story.id}/play` } });

  return <main className="detail-page">
    <section className="detail-hero" style={{ backgroundImage: `url(${getStoryArtwork(story)})` }}>
      <div className="detail-scrim" />
      <div className="page-shell detail-layout">
        <div className="detail-cover"><img src={getStoryArtwork(story)} alt={`${story.title} cover`} /><Tag>{getStoryTypeLabel(story.type)}</Tag></div>
        <div className="detail-copy"><span className="eyebrow">Interactive Story</span><Title as={1}>{story.title}</Title><p className="detail-author">Published on StoryVerse</p>
          <div className="detail-stats"><span><Icon name="book" /> {story.nodes?.length || 0} scenes</span><span><Icon name="branch" /> {story.choices?.length || 0} choices</span><span><Icon name="trophy" /> {endings.length} endings</span></div>
          <p className="synopsis">{story.description}</p>
          <div className="detail-actions"><Button icon="play" onClick={startStory}>{isAuthenticated ? 'Start story' : 'Log in to play'}</Button><Button variant="secondary" icon="book" onClick={() => navigate('/')}>Back to stories</Button></div>
        </div>
      </div>
    </section>
    <div className="page-shell detail-body">
      <div className="detail-main"><SectionHeader eyebrow="Story path" title="Scenes" /><div className="chapter-list">{(story.nodes || []).map((node, index) => <div className={`chapter ${node.isStart ? 'chapter-active' : ''}`} key={node.id}><span className="chapter-num">{String(index + 1).padStart(2, '0')}</span><span className="chapter-state">{node.isStart ? 'Starting scene' : node.isEnding ? 'Ending' : `${choicesByNode.get(node.id)?.length || 0} choices`}</span><Title as={3}>{node.title || `Scene ${index + 1}`}</Title><span>{node.rewardExp ? `${node.rewardExp} EXP` : 'Story scene'}</span>{node.isStart ? <Button variant="secondary" icon="play" onClick={startStory}>Play</Button> : <Icon name="chevron" />}</div>)}</div></div>
      <aside className="detail-aside"><div className="ending-card"><span className="eyebrow">Available paths</span><Title as={2}>Ending branches</Title><div className="tree"><div className="tree-root">{story.nodes?.find((node) => node.isStart)?.title || 'Story begins'}</div><div className="tree-lines"><span /><span /><span /></div><div className="tree-nodes">{endings.slice(0, 3).map((ending) => <span className="found" key={ending.id}>{ending.title || ending.endingType}</span>)}{endings.length === 0 && <span className="current">No endings configured</span>}</div></div><p>{endings.length} ending{endings.length === 1 ? '' : 's'} available in this story</p><Progress value={endings.length ? 100 : 0} /></div>
        <div className="review-card"><SectionHeader title="Story information" /><p>Status: <strong>{story.status}</strong></p><p>Last updated: {new Date(story.updatedAt).toLocaleDateString()}</p>{isAuthenticated && <Button variant="secondary" onClick={() => navigate('/creator')}>Open Creator Studio</Button>}</div>
      </aside>
    </div>
  </main>;
}
