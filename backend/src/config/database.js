const sql = require('mssql');
const env = require('./env');

const hasAzureSqlConfig = Boolean(
  env.AZURE_SQL.server && env.AZURE_SQL.database && env.AZURE_SQL.user && env.AZURE_SQL.password
);

let poolPromise;

function getAzureSqlConfig() {
  return {
    user: env.AZURE_SQL.user,
    password: env.AZURE_SQL.password,
    server: env.AZURE_SQL.server,
    database: env.AZURE_SQL.database,
    port: 1433,
    options: {
      encrypt: true,
      trustServerCertificate: false
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    }
  };
}

async function getPool() {
  if (!env.AZURE_SQL.enabled || !hasAzureSqlConfig) {
    return null;
  }

  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(getAzureSqlConfig())
      .connect()
      .then((pool) => {
        console.log('🔌 Connected to Azure SQL Database');
        return pool;
      })
      .catch((error) => {
        console.error('❌ Azure SQL connection failed, fallback to local data store:', error.message);
        poolPromise = null;
        return null;
      });
  }

  return poolPromise;
}

module.exports = {
  sql,
  getPool,
  hasAzureSqlConfig
};
