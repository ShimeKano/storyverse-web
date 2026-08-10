import { useEffect, useRef, useState } from 'react';
import { api } from '../api/client';
import { storyTemplate } from '../utils/storyTemplate';

function formatPayload(value) {
  return JSON.stringify(value, null, 2);
}

export default function UploadPage() {
  const [payload, setPayload] = useState(formatPayload(storyTemplate));
  const [stories, setStories] = useState([]);
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('json');
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  async function loadStories() {
    const response = await api.get('/stories?includeOwnDrafts=true');
    setStories(response.data);
  }

  useEffect(() => {
    loadStories().catch((error) => setMessage(error.message));
  }, []);

  function parseStoryText(text) {
    const body = JSON.parse(text);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      throw new Error('Story JSON phải là một object.');
    }
    if (!body.title || !body.description || !body.type || !Array.isArray(body.nodes)) {
      throw new Error('JSON thiếu title, description, type hoặc nodes.');
    }
    setPayload(formatPayload(body));
    setPreview({
      title: body.title,
      type: String(body.type).toUpperCase(),
      nodes: body.nodes.length,
      description: body.description
    });
    setMessage('Đã đọc và kiểm tra sơ bộ file JSON.');
  }

  async function handleFile(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.json')) {
      setMessage('Chỉ hỗ trợ file .json.');
      return;
    }

    try {
      parseStoryText(await file.text());
    } catch (error) {
      setPreview(null);
      setMessage(`JSON không hợp lệ: ${error.message}`);
    }
  }

  async function handleCreate(event) {
    event.preventDefault();
    setMessage('');

    try {
      const body = JSON.parse(payload);
      await api.post('/stories', body);
      setMessage('Tạo truyện thành công.');
      setPreview(null);
      await loadStories();
    } catch (error) {
      setMessage(error.message || 'JSON không hợp lệ.');
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

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  }

  return (
    <section className="grid-two">
      <article className="card">
        <h2>Đăng tải truyện/chapter</h2>
        <p>Chọn JSON Upload để chỉnh JSON trực tiếp hoặc Drag &amp; Drop để nhập file mẫu.</p>

        <div className="mode-switch" role="tablist" aria-label="Upload mode">
          <button type="button" className={mode === 'json' ? 'active' : ''} onClick={() => setMode('json')}>
            JSON Upload
          </button>
          <button type="button" className={mode === 'dragdrop' ? 'active' : ''} onClick={() => setMode('dragdrop')}>
            Drag &amp; Drop
          </button>
        </div>

        {mode === 'dragdrop' ? (
          <>
            <input
              ref={inputRef}
              type="file"
              accept="application/json,.json"
              hidden
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
            <div
              className={`drag-zone${isDragging ? ' is-dragging' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click();
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <strong>Kéo thả file JSON vào đây</strong>
              <span>hoặc bấm để chọn file</span>
            </div>
            <p>
              <a href="/samples/project17.json" download>
                Tải JSON mẫu project17
              </a>
            </p>
          </>
        ) : null}

        <form onSubmit={handleCreate}>
          <textarea rows={16} value={payload} onChange={(e) => setPayload(e.target.value)} />
          <button type="submit">Tạo truyện</button>
        </form>

        {preview && (
          <div className="card">
            <strong>{preview.title}</strong>
            <p>{preview.type} · {preview.nodes} nodes</p>
            <p>{preview.description}</p>
          </div>
        )}
      </article>

      <article className="card">
        <h3>Truyện của bạn ({stories.length})</h3>
        <ul>
          {stories.map((story) => (
            <li key={story.id}>
              <strong>{story.title}</strong> - {story.status}
              {story.status === 'DRAFT' && <button type="button" onClick={() => submitStory(story.id)}>Gửi duyệt</button>}
            </li>
          ))}
        </ul>
      </article>

      {message && <p>{message}</p>}
    </section>
  );
}
