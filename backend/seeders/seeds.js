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
const stephen = users[3];
const omar = users[4];
// SEED IDEAS
const ideas = [];

const chatter = new Idea({
  owner: demo._id,
  title: 'Chatter',
  body: 'Introducing our innovative mobile app that will revolutionize the way you do business! Our app provides a user-friendly platform for businesses to connect with their customers, streamline operations, and boost productivity. With features such as real-time messaging, appointment scheduling, and inventory management, our app is designed to simplify your business processes and enhance customer satisfaction. Our team of experienced developers will work closely with you to customize the app to meet your unique business needs. Stay ahead of the competition and take your business to the next level with our mobile app solution!',
});

const intelWishes = new Idea({
  owner: edward._id,
  title: 'Intel Wishes',
  body: 'We are excited to present our cutting-edge microchip technology that will transform the way you design and develop your products! Our microchips offer unmatched performance, efficiency, and versatility, enabling you to create innovative solutions for your customers. With our state-of-the-art manufacturing facilities and experienced team of engineers, we provide customized microchip solutions that meet your specific requirements. Our commitment to quality and customer satisfaction ensures that you get the best value for your investment. Partner with us and take your business to new heights with our advanced microchip technology!',
});

const betterPrius = new Idea({
  owner: stephen._id,
  title: 'Better Prius',
  body: 'We are thrilled to introduce our top-of-the-line car model that redefines luxury, performance, and safety! Our car boasts an array of innovative features such as advanced driver-assist technologies, state-of-the-art infotainment system, and premium sound system. With exceptional design and engineering, our car delivers unparalleled performance, handling, and fuel efficiency. Our commitment to quality and reliability ensures that you enjoy a worry-free driving experience. Our knowledgeable sales team and experienced service technicians are dedicated to providing exceptional customer service and support. Come experience the ultimate driving pleasure with our exceptional car model!',
});

const elonsTwin = new Idea({
  owner: daniel._id,
  title: 'Not-Space-X',
  body: 'We are proud to present our comprehensive aerospace solutions that cater to the ever-evolving needs of the industry! Our state-of-the-art aircraft, propulsion, and space systems offer unmatched performance, efficiency, and safety. With our expertise in design, engineering, and manufacturing, we provide customized solutions that meet your specific requirements. Our commitment to quality and innovation has earned us a reputation as a trusted partner in the aerospace industry. Our highly skilled team of engineers, technicians, and support staff work closely with you to deliver on-time and on-budget solutions. Partner with us and soar to new heights with our advanced aerospace solutions!',
});

const swa = new Idea({
  owner: omar._id,
  title: 'Not to be confused with AWS',
  body: 'We are excited to introduce our cutting-edge sports industry technology that will revolutionize the way athletes train, compete, and perform! Our state-of-the-art systems offer real-time data analysis, performance tracking, and personalized training programs that help athletes achieve their full potential. With our innovative technologies, coaches and trainers can monitor individual and team performance, identify areas for improvement, and make data-driven decisions to optimize training and game strategies. Our knowledgeable team of sports scientists, engineers, and data analysts work closely with you to develop customized solutions that meet your unique requirements. Partner with us and take your sports team to the next level with our advanced technology!',
});

const azureWho = new Idea({
  owner: users[5]._id,
  title: "Won't go down like Azure",
  body: 'We are excited to present our advanced cloud systems that provide secure, reliable, and scalable solutions for your business needs! Our cutting-edge technology offers real-time data access, secure data storage, and flexible computing resources, enabling you to optimize your operations and maximize productivity. With our customizable cloud systems, you can tailor the infrastructure to meet your unique requirements, and our expert team provides continuous support and maintenance to ensure that your cloud system is always up and running. Partner with us and take your business to the next level with our advanced cloud systems!',
});

const demoIdea = new Idea({
  owner: users[6]._id,
  title: 'System Modeling Solution',
  body: 'We are thrilled to introduce our innovative systems modeling software that enables you to design and optimize complex systems with ease! Our software offers advanced modeling and simulation capabilities, allowing you to visualize and analyze the behavior of your systems before implementation. With our software, you can improve system performance, reduce development costs, and minimize risk. Our experienced team of engineers and software developers work closely with you to customize the software to your unique requirements and provide comprehensive training and support to ensure your success. Partner with us and streamline your system development process with our advanced modeling software!',
});

const scrubDaddy = new Idea({
  owner: users[7]._id,
  title: 'Scrub Granddaddy',
  body: 'Introducing the new and improved Scrub Daddy - the revolutionary cleaning tool that makes tough cleaning jobs a breeze! Our innovative design features FlexTexture® foam that adjusts to your water temperature, providing a gentle yet effective scrubbing experience. With its smiley face shape and versatile features, the Scrub Daddy can clean dishes, countertops, and even tough outdoor surfaces. Our commitment to quality and customer satisfaction ensures that you get the best value for your investment. Join the millions of satisfied customers and upgrade your cleaning game with the new Scrub Daddy!',
});

ideas.push(
  chatter,
  intelWishes,
  betterPrius,
  elonsTwin,
  swa,
  azureWho,
  demoIdea,
  scrubDaddy
);

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
