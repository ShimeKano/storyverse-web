const fs = require('fs/promises');
const path = require('path');
const env = require('../config/env');
const { getPool } = require('../config/database');

const dataPath = path.join(__dirname, '..', 'data', 'local-db.json');
const STATE_ID = 1;

async function readBootstrapState() {
  const raw = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(raw);
}

async function readState() {
  const pool = await getPool();
  if (!pool) {
    return readBootstrapState();
  }

  const result = await pool
    .request()
    .input('id', STATE_ID)
    .query('SELECT stateJson FROM StoryVerseState WHERE id = @id');

  if (result.recordset[0]) {
    return JSON.parse(result.recordset[0].stateJson);
  }

  const initialState = await readBootstrapState();
  await pool
    .request()
    .input('id', STATE_ID)
    .input('stateJson', JSON.stringify(initialState))
    .query(`
      INSERT INTO StoryVerseState (id, stateJson, updatedAt)
      VALUES (@id, @stateJson, SYSUTCDATETIME())
    `);

  return initialState;
}

async function writeState(state) {
  const pool = await getPool();
  if (!pool) {
    const raw = JSON.stringify(state, null, 2);
    await fs.writeFile(dataPath, raw);
    return state;
  }

  await pool
    .request()
    .input('id', STATE_ID)
    .input('stateJson', JSON.stringify(state))
    .query(`
      UPDATE StoryVerseState
      SET stateJson = @stateJson, updatedAt = SYSUTCDATETIME()
      WHERE id = @id
    `);

  return state;
}

async function mutateState(mutator) {
  const state = await readState();
  const result = await mutator(state);
  await writeState(state);
  return result;
}

module.exports = {
  readState,
  writeState,
  mutateState,
  dataPath,
  usesAzureSql: env.DATA_PROVIDER === 'azure'
};
