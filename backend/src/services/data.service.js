const stateRepository = require('../repositories/state.repository');

function getNextId(db, key) {
  const next = db.meta.nextIds[key] || 1;
  db.meta.nextIds[key] = next + 1;
  return next;
}

async function readLocalData() {
  return stateRepository.readState();
}

async function writeLocalData(data) {
  return stateRepository.writeState(data);
}

async function mutateLocalData(mutator) {
  return stateRepository.mutateState(mutator);
}

async function getDataProvider() {
  if (stateRepository.usesAzureSql) {
    const pool = await require('../config/database').getPool();
    if (pool) {
      return { type: 'azure', pool };
    }
  }

  return { type: 'local' };
}

module.exports = {
  readLocalData,
  writeLocalData,
  mutateLocalData,
  getNextId,
  getDataProvider,
  dataPath: stateRepository.dataPath
};
