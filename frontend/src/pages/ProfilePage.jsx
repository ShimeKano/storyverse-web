import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [stories, setStories] = useState([]);
  const [message, setMessage] = useState('');

  async function loadProfile() {
    const [profileResponse, storiesResponse] = await Promise.all([
      api.get('/profile/me'),
      api.get('/stories?includeOwnDrafts=true')
    ]);

    const profileData = profileResponse.data;
    const userId = profileData?.profile?.userId;

    setProfile(profileData);
    setStories(
      (storiesResponse.data || []).filter(
        (story) => Number(story.authorId) === Number(userId)
      )
    );
  }

  useEffect(() => {
    loadProfile().catch((error) => setMessage(error.message));
  }, []);

  return (
    <section className="grid-two">
      <article className="card">
        <h2>Thông tin người chơi</h2>
        {message && <p>{message}</p>}
        {profile && (
          <>
            <p>Tên: {profile.profile.displayName}</p>
            <p>Level: {profile.profile.level}</p>
            <p>EXP: {profile.profile.exp}</p>
            <p>Tim: {profile.hearts.currentHearts}/{profile.hearts.maxHearts}</p>
            <p>Số ending đã mở: {profile.endings.length}</p>
            <h3>Inventory</h3>
            <ul>
              {profile.inventory.map((item) => (
                <li key={`${item.userId}-${item.itemId}`}>{item.name} x{item.quantity}</li>
              ))}
            </ul>
          </>
        )}
      </article>

      <article className="card">
        <h2>Truyện đã tải lên</h2>
        <p>{stories.length} truyện thuộc tài khoản này.</p>
        {stories.length === 0 ? (
          <p>Chưa có truyện. Hãy vào Đăng tải để tạo truyện đầu tiên.</p>
        ) : (
          <ul>
            {stories.map((story) => (
              <li key={story.id}>
                <strong>{story.title}</strong> — {story.status}
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
