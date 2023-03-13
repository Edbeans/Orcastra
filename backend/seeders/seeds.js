const mongoose = require('mongoose');
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;

// SEED USERS
const users = [];

users.push(
  new User({
    username: 'demo',
    email: 'demo@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
  })
);

users.push(
  new User({
    username: 'edward',
    email: 'edward@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
  })
);

users.push(
  new User({
    username: 'daniel',
    email: 'daniel@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
  })
);

users.push(
  new User({
    username: 'stephen',
    email: 'stephen@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
  })
);

users.push(
  new User({
    username: 'omar',
    email: 'omar@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
  })
);

for (let i = 0; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User({
      username: faker.name.firstName(),
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync('password', 10),
    })
  );
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    insertSeeds();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
  console.log('Resetting db and seeding users and tweets...');
  User.collection
    .drop()
    .then(() => User.insertMany(users))
    .then(() => {
      console.log('done!');
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};
