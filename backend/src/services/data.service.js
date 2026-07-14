const fs = require('fs/promises');
const path = require('path');
const env = require('../config/env');
const { getPool } = require('../config/database');

const dataPath = path.join(__dirname, '..', 'data', 'local-db.json');

async function readLocalData() {
  const raw = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(raw);
}

async function writeLocalData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}

async function mutateLocalData(mutator) {
  const db = await readLocalData();
  const result = await mutator(db);
  await writeLocalData(db);
  return result;
}

function getNextId(db, key) {
  const next = db.meta.nextIds[key] || 1;
  db.meta.nextIds[key] = next + 1;
  return next;
}

async function getDataProvider() {
  if (env.DATA_PROVIDER === 'azure') {
    const pool = await getPool();
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
  dataPath
};
