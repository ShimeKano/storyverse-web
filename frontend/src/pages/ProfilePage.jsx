import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');

  async function loadProfile() {
    const response = await api.get('/profile/me');
    setProfile(response.data);
  }

  useEffect(() => {
    loadProfile().catch((error) => setMessage(error.message));
  }, []);

  return (
    <section className="card">
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
    </section>
  );
}
