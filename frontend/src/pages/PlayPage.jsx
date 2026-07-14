import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function PlayPage() {
  const [stories, setStories] = useState([]);
  const [activeStory, setActiveStory] = useState(null);
  const [node, setNode] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api
      .get('/stories')
      .then((response) => setStories(response.data))
      .catch((error) => setMessage(error.message));
  }, []);

  async function start(story) {
    try {
      const response = await api.get(`/game/${story.id}/start`);
      setActiveStory(story);
      setNode(response.data.node);
      setMessage('Bắt đầu chơi, đã tiêu hao 1 tim.');
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function choose(choice) {
    try {
      const response = await api.post(`/game/${activeStory.id}/choice`, {
        nodeId: node.id,
        choiceId: choice.id
      });
      setNode(response.data.node);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="grid-two">
      <article className="card">
        <h2>Gameplay</h2>
        <ul>
          {stories.map((story) => (
            <li key={story.id}>
              <strong>{story.title}</strong> ({story.type})
              <button onClick={() => start(story)}>Chơi</button>
            </li>
          ))}
        </ul>
      </article>

      <article className="card">
        <h3>{activeStory ? activeStory.title : 'Chưa chọn truyện'}</h3>
        {node && (
          <>
            <p>{node.content}</p>
            {!node.isEnding ? (
              <div className="choice-list">
                {node.choices.map((choice) => (
                  <button key={choice.id} onClick={() => choose(choice)}>
                    {choice.choiceText}
                  </button>
                ))}
              </div>
            ) : (
              <p>Kết thúc: {node.endingType}</p>
            )}
          </>
        )}
      </article>

      {message && <p>{message}</p>}
    </section>
  );
}
