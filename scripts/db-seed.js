#!/usr/bin/env node
const faker = require('faker');
const _ = require('lodash');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('../config/env');

const DB = require('../src-server/db');
const auth = require('../src-server/components/auth/helpers');

const tableAudits = 'audits';
const tableProjects = 'projects';
const tableUsers = 'users';

const createRecordProject = (db, table, user) => db[table].insert({
  title: faker.commerce.product(),
  description: faker.lorem.text(),
  owner_id: user.id,
});

const createRecordAudit = (db, table, user) => db[table].insert({
  event: _.sample([
    'authentication:logout',
    'authentication:new',
    'invoice:create',
    'invoice:send',
    'settings:change',
  ]),
  status: _.sample(['started', 'in progress', 'finished', 'error']),
  message: faker.lorem.text(),
  context: {},
  user_id: user.id,
});

function openDB() {
  console.log('Connecting to the DB...');
  return DB();
}

function seedProjects(db, users) {
  // Seed with fake data
  console.log('Seeding [projects]...');
  const records = [];
  try {
    for (let i = 1; i <= 10; i += 1) {
      const user = users[_.random(users.length - 1)];
      records.push(createRecordProject(db, tableProjects, user));
    }
  } catch (e) {
    console.error(e);
  }

  return Promise.all(records);
}

function seedAudits(db, users) {
  // Seed with fake data
  console.log('Seeding [audits]...');
  const records = [];
  try {
    for (let i = 1; i <= 100; i += 1) {
      const user = users[_.random(users.length - 1)];
      records.push(createRecordAudit(db, tableAudits, user));
    }
  } catch (e) {
    console.error(e);
  }

  return Promise.all(records);
}

function seedUsers(db) {
  console.log('Seeding [users]...');
  const users = [{
    email: 'test@example.com',
    password: auth.createHash('password'),
    firstName: 'User',
    lastName: 'Test'
  }, {
    email: 'test2@example.com',
    password: auth.createHash('password'),
    firstName: 'User',
    lastName: 'Test 2'
  }];

  return db[tableUsers].insert(users);
}

function seed(db) {
  // Run seeding functions
  return seedUsers(db)
    .then((users) => Promise.all([
      seedProjects(db, users),
      seedAudits(db, users),
    ]))
    .then(() => {
      console.log('Successfully completed the seeding process');
    });
}

function clearDB(db) {
  if (process.env.NODE_ENV !== 'test') throw new Error('ClearDB can only be run on TEST DB!!!');

  // Clear [projects] and restart the sequence
  return db[tableProjects].destroy({})
    .then(() => db.query('ALTER SEQUENCE projects_id_seq RESTART WITH 1'))
    .then(() => db[tableUsers].destroy({}))
    .then(() => db.query('ALTER SEQUENCE users_id_seq RESTART WITH 1'))
    .then(() => {
      console.log('Successfully cleared the DB');
    });
}

function closeDB(db) {
  return db.instance.$pool.end();
}

if (require.main === module) {
  openDB().then(db => seed(db.db));
} else {
  module.exports = {
    openDB, seed, clearDB, closeDB
  };
}
