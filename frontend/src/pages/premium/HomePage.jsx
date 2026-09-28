import { useEffect, useMemo, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router';
import { api } from '../../api/client';
import useAuth from '../../hooks/useAuth';
import { getStoryArtwork, getStoryTypeLabel, storyService } from '../../services/storyService';
import { Button, Icon, Progress, SectionHeader, Tag, Title } from '../../components/premium/Ui';

function StoryCard({ story, index, onOpen }) {
  return <article className="story-card">
    <button type="button" className="story-card-action" onClick={onOpen} aria-label={`Open ${story.title}`}>
      <div className="cover-wrap">
        <img src={getStoryArtwork(story, index)} alt={`${story.title} cover`} />
        <div className="cover-shade" />
        <Tag>{getStoryTypeLabel(story.type)}</Tag>
      </div>
      <div className="card-copy">
        <Title as={3}>{story.title}</Title>
        <p>{story.description}</p>
        <div className="card-meta"><span><Icon name="book" size={14} /> {story.status}</span><span><Icon name="arrow" size={14} /> Read story</span></div>
      </div>
    </button>
  </article>;
}

export default function HomePage() {
  const stories = useLoaderData();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [continuedStories, setContinuedStories] = useState([]);
  const [profileError, setProfileError] = useState('');
  const query = searchParams.get('q')?.trim().toLowerCase() || '';
  const visibleStories = useMemo(() => stories.filter((story) => !query || `${story.title} ${story.description} ${story.type}`.toLowerCase().includes(query)), [query, stories]);
  const hero = visibleStories[0] || stories[0];

  useEffect(() => {
    let active = true;
    if (!isAuthenticated) { setContinuedStories([]); return () => { active = false; }; }
    async function loadProgress() {
      const response = await api.get('/profile/me');
      const journeys = await Promise.all((response.data.progress || []).map(async (entry) => {
        const story = stories.find((item) => Number(item.id) === Number(entry.storyId));
        if (!story) return null;
        const detail = await storyService.get(story.id);
        const sceneIndex = Math.max(0, (detail.nodes || []).findIndex((node) => Number(node.id) === Number(entry.currentNodeId)));
        const percent = detail.nodes?.length ? Math.round(((sceneIndex + 1) / detail.nodes.length) * 100) : 0;
        return { entry, story, percent };
      }));
      if (active) setContinuedStories(journeys.filter(Boolean));
    }
    loadProgress().catch((error) => { if (active) setProfileError(error.message); });
    return () => { active = false; };
  }, [isAuthenticated, stories]);
  const goDetail = (story) => navigate(`/stories/${story.id}`);
  const goPlay = (story) => navigate(isAuthenticated ? `/stories/${story.id}/play` : '/login', { state: { from: `/stories/${story.id}/play` } });

  if (!hero) return <main className="premium-empty page-shell"><Title as={1}>No stories are available yet.</Title><p>Published stories from the StoryVerse API will appear here.</p>{isAuthenticated && <Button onClick={() => navigate('/upload')} icon="plus">Create the first story</Button>}</main>;

  return <main>
    <section className="hero" style={{ backgroundImage: `url(${getStoryArtwork(hero)})` }}>
      <div className="hero-overlay" /><div className="hero-grain" />
      <div className="hero-content page-shell">
        <div className="hero-kicker"><span /> Featured story</div>
        <Title as={1} className="hero-title">{hero.title}</Title>
        <p className="hero-description">{hero.description}</p>
        <div className="tag-row"><Tag active>{getStoryTypeLabel(hero.type)}</Tag><Tag>{hero.status}</Tag><Tag>Choice-Driven</Tag></div>
        <div className="author-row"><img src="/assets/elena.jpg" alt="Story author" /><span><small>Story creator</small>StoryVerse Author</span><span className="divider" /><span><Icon name="branch" size={16} /> Interactive paths</span></div>
        <div className="hero-actions"><Button icon="play" onClick={() => goPlay(hero)}>Start story</Button><Button variant="secondary" onClick={() => goDetail(hero)}>View story</Button></div>
      </div>
      <div className="hero-index">01 <span>/ {String(stories.length).padStart(2, '0')}</span></div>
    </section>

    <div className="page-shell home-content">
      <section aria-labelledby="featured-title">
        <div id="featured-title"><SectionHeader eyebrow={query ? 'Search results' : 'Curated for you'} title={query ? `Stories matching “${searchParams.get('q')}”` : 'Featured stories'} /></div>
        {visibleStories.length ? <div className="story-grid">{visibleStories.map((story, index) => <StoryCard key={story.id} story={story} index={index} onOpen={() => goDetail(story)} />)}</div> : <p className="status-message">No published stories match your search.</p>}
      </section>

      {isAuthenticated && <section>
        <SectionHeader eyebrow="Your journeys" title="Continue reading" action="Open library" onAction={() => navigate('/profile')} />
        {profileError && <p className="status-message error" role="alert">{profileError}</p>}
        {continuedStories.length ? <div className="continue-grid">{continuedStories.map(({ entry, story, percent }, index) => <button type="button" className="continue-card" key={story.id} onClick={() => goPlay(story)}><img src={getStoryArtwork(story, index)} alt="" /><div><span className="eyebrow">Continue your path</span><Title as={3}>{story.title}</Title><p>Resume from your saved StoryVerse progress.</p><Progress value={percent} compact label={`${story.title} progress`} /><small>Last played {new Date(entry.lastPlayedAt).toLocaleDateString()}</small></div><Icon name="play" /></button>)}</div> : <p className="status-message">Start a story to build your reading journey.</p>}
      </section>}

      <section><SectionHeader eyebrow="Find your next world" title="Browse by genre" /><div className="categories">{['Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Adventure', 'Thriller'].map((category, index) => <button type="button" className="category" key={category} onClick={() => navigate(`/?q=${encodeURIComponent(category)}`)}><span>0{index + 1}</span><Title as={3}>{category}</Title><Icon name="arrow" /></button>)}</div></section>
      <section><SectionHeader eyebrow="From the community" title="All published stories" action="View rankings" onAction={() => navigate('/leaderboard')} /><div className="trending">{stories.slice(0, 5).map((story, index) => <button type="button" className="trend-item" key={story.id} onClick={() => goDetail(story)}><span className="rank">{String(index + 1).padStart(2, '0')}</span><img src={getStoryArtwork(story, index + 2)} alt="" /><div><Title as={3}>{story.title}</Title><p>{story.description}</p></div><Tag>{getStoryTypeLabel(story.type)}</Tag><Icon name="arrow" /></button>)}</div></section>
    </div>
  </main>;
}
