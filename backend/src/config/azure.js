const env = require('./env');

function getAzureRuntimeConfig() {
  return {
    sql: {
      enabled: env.AZURE_SQL.enabled,
      configured: Boolean(env.AZURE_SQL.server && env.AZURE_SQL.database)
    },
    storage: {
      enabled: env.AZURE_STORAGE.enabled,
      configured: Boolean(env.AZURE_STORAGE.connectionString),
      container: env.AZURE_STORAGE.container
    },
    cosmos: {
      enabled: env.AZURE_COSMOS.enabled,
      configured: Boolean(env.AZURE_COSMOS.endpoint && env.AZURE_COSMOS.key),
      database: env.AZURE_COSMOS.database
    }
  };
}

module.exports = {
  getAzureRuntimeConfig
};
