const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const { getAzureRuntimeConfig } = require('./config/azure');
const errorHandler = require('./middleware/errorHandler');
const app = express();

app.set('trust proxy', 1);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser/server-to-server requests without an Origin header.
    if (!origin) return callback(null, true);
    if (env.CORS_ORIGINS.includes('*') || env.CORS_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'StoryVerse backend is running',
    provider: env.DATA_PROVIDER,
    azure: getAzureRuntimeConfig(),
    time: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send('StoryVerse API Running');
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/stories', require('./routes/story.routes'));
app.use('/api/game', require('./routes/game.routes'));
app.use('/api/ranking', require('./routes/ranking.routes'));

app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`🚀 Server is running on port ${env.PORT}`);
});

app.get('/api/test', (req, res) => {
  res.json({ ok: true, version: 'v1.0.3' });
});
