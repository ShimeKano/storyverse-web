require('dotenv').config();

const azureSqlEnabled = String(process.env.AZURE_SQL_ENABLED || 'false').toLowerCase() === 'true';

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 5000),
  DATA_PROVIDER: (process.env.DATA_PROVIDER || (azureSqlEnabled ? 'azure' : 'local')).toLowerCase(),
  HEART_RECOVER_MINUTES: Number(process.env.HEART_RECOVER_MINUTES || 15),
  JWT_SECRET: process.env.JWT_SECRET || 'dev-only-change-me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGINS: (process.env.CORS_ORIGINS || [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:4173',
    'https://storyverse-web-lake.vercel.app',
    'https://storyverse-e9k15dwi5-shime1kano.vercel.app',
    'https://storyverse-web-git-feature-azure-sql-migration-shime1kano.vercel.app'
  ].join(','))
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean),
  AZURE_SQL: {
    enabled: azureSqlEnabled,
    server: process.env.AZURE_SQL_SERVER || process.env.DB_SERVER || '',
    database: process.env.AZURE_SQL_DATABASE || process.env.DB_DATABASE || process.env.DB_NAME || '',
    user: process.env.AZURE_SQL_USER || process.env.DB_USER || '',
    password: process.env.AZURE_SQL_PASSWORD || process.env.DB_PASSWORD || ''
  },
  AZURE_STORAGE: {
    enabled: String(process.env.AZURE_STORAGE_ENABLED || 'false').toLowerCase() === 'true',
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING || '',
    container: process.env.AZURE_STORAGE_CONTAINER || 'story-assets'
  },
  AZURE_COSMOS: {
    enabled: String(process.env.AZURE_COSMOS_ENABLED || 'false').toLowerCase() === 'true',
    endpoint: process.env.AZURE_COSMOS_ENDPOINT || '',
    key: process.env.AZURE_COSMOS_KEY || '',
    database: process.env.AZURE_COSMOS_DATABASE || 'storyverse'
  }
};

module.exports = env;
