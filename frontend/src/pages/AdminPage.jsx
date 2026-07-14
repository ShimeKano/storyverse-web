import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [pendingStories, setPendingStories] = useState([]);
  const [message, setMessage] = useState('');

  async function loadData() {
    const [usersRes, storiesRes] = await Promise.all([api.get('/users'), api.get('/stories?status=PENDING')]);
    setUsers(usersRes.data);
    setPendingStories(storiesRes.data);
  }

  useEffect(() => {
    loadData().catch((error) => setMessage(error.message));
  }, []);

  async function review(storyId, status) {
    try {
      await api.post(`/admin/stories/${storyId}/review`, { status });
      await loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="grid-two">
      <article className="card">
        <h2>Admin / Manager</h2>
        {message && <p>{message}</p>}
        <h3>Truyện chờ duyệt</h3>
        <ul>
          {pendingStories.map((story) => (
            <li key={story.id}>
              {story.title}
              <button onClick={() => review(story.id, 'APPROVED')}>Approve</button>
              <button onClick={() => review(story.id, 'REJECTED')}>Reject</button>
            </li>
          ))}
        </ul>
      </article>

      <article className="card">
        <h3>Quản lý người dùng</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.role} - {user.isBanned ? 'BANNED' : 'ACTIVE'}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
