import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function LeaderboardPage() {
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api
      .get('/ranking')
      .then((response) => setRows(response.data))
      .catch((error) => setMessage(error.message));
  }, []);

  return (
    <section className="card">
      <h2>Bảng xếp hạng</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Người chơi</th>
            <th>Level</th>
            <th>EXP</th>
            <th>Endings</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.userId}>
              <td>{index + 1}</td>
              <td>{row.username}</td>
              <td>{row.level}</td>
              <td>{row.exp}</td>
              <td>{row.endings}</td>
              <td>{row.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
