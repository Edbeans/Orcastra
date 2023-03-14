const mongoose = require('mongoose');
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Idea = require('../models/Idea');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_IDEAS = 20;

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
  users.push(
    new User({
      username: faker.name.firstName(),
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync('password', 10),
    })
  );
}

const demo = users[0];
const edward = users[1];
const daniel = users[2];
const omar = users[3];
// SEED IDEAS
const ideas = [];

const demoIdea = new Idea({
  owner: demo._id,
  title: 'Test Idea 1',
  body: 'dkjafskdjflakdjlkjakldfjkasfjkdGJFHDGASDLFJHASGDJHFGSDAHJGFJHKSDAGFJHSDGFKJASGJFKJDSGAFDSJGFJASDGFJKDSHAJKDFHKAJSHDKJSFHJKFHGDSKJGHJKgfhkdsghfdkjghaskhsfdjghlfsdghkjghfsdhglfkfhdskfgbsjdgkjfsdhghfdksghkdfgjhsdkjghkjdfshgkjsdfhgkdsfhgkjsdfhglsdhfljgdh',
});

ideas.push(demoIdea);

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
  console.log('Resetting db and seeding users...');
  User.collection
    .drop()
    .then(() => Idea.collection.drop())
    .then(() => User.insertMany(users))
    .then(() => Idea.insertMany(ideas))
    .then(() => {
      console.log('done!');
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};
