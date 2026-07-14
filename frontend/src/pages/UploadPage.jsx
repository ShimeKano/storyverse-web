import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { storyTemplate } from '../utils/storyTemplate';

export default function UploadPage() {
  const [payload, setPayload] = useState(JSON.stringify(storyTemplate, null, 2));
  const [stories, setStories] = useState([]);
  const [message, setMessage] = useState('');

  async function loadStories() {
    const response = await api.get('/stories?includeOwnDrafts=true');
    setStories(response.data);
  }

  useEffect(() => {
    loadStories().catch((error) => setMessage(error.message));
  }, []);

  async function handleCreate(event) {
    event.preventDefault();
    setMessage('');

    try {
      const body = JSON.parse(payload);
      await api.post('/stories', body);
      setMessage('Tạo truyện thành công.');
      await loadStories();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function submitStory(id) {
    try {
      await api.post(`/stories/${id}/submit`, {});
      setMessage('Đã gửi truyện để duyệt.');
      await loadStories();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="grid-two">
      <article className="card">
        <h2>Đăng tải truyện/chapter</h2>
        <p>Nhập JSON theo mẫu để tạo story graph gồm chapter/node/choice/ending.</p>
        <form onSubmit={handleCreate}>
          <textarea rows={16} value={payload} onChange={(e) => setPayload(e.target.value)} />
          <button type="submit">Tạo truyện</button>
        </form>
      </article>

      <article className="card">
        <h3>Truyện của bạn</h3>
        <ul>
          {stories.map((story) => (
            <li key={story.id}>
              <strong>{story.title}</strong> - {story.status}
              {story.status === 'DRAFT' && <button onClick={() => submitStory(story.id)}>Gửi duyệt</button>}
            </li>
          ))}
        </ul>
      </article>

      {message && <p>{message}</p>}
    </section>
  );
}
