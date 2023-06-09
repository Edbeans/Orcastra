const mongoose = require('mongoose');
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Idea = require('../models/Idea');
const Comment = require('../models/Comment');
const Bid = require('../models/Bid');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
// const NUM_SEED_IDEAS = 20;
const NUM_SEED_COMMENTS = 20;

// SEED USERS
const users = [];
const DEFAULT_PROFILE_IMAGE_URL =
  'https://ey-aws-mern-orcastra.s3.us-west-1.amazonaws.com/public/default-profile-picture.png';

users.push(
  new User({
    username: 'demo',
    email: 'demo@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    ideas: [],
    comments: [],
    bids: [],
    profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
  })
);

users.push(
  new User({
    username: 'edward',
    email: 'edward@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    ideas: [],
    comments: [],
    bids: [],
    profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
  })
);

users.push(
  new User({
    username: 'daniel',
    email: 'daniel@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    ideas: [],
    comments: [],
    bids: [],
    profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
  })
);

users.push(
  new User({
    username: 'stephen',
    email: 'stephen@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    ideas: [],
    comments: [],
    bids: [],
    profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
  })
);

users.push(
  new User({
    username: 'omar',
    email: 'omar@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    ideas: [],
    comments: [],
    bids: [],
    profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
  })
);

for (let i = 0; i < NUM_SEED_USERS; i++) {
  users.push(
    new User({
      username: faker.name.firstName(),
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync('password', 10),
      ideas: [],
      comments: [],
      bids: [],
      profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
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
  imageUrls: [],
  comments: [],
  bids: [],
});

const intelWishes = new Idea({
  owner: edward._id,
  title: 'Intel Clone',
  body: 'We are excited to present our cutting-edge microchip technology that will transform the way you design and develop your products! Our microchips offer unmatched performance, efficiency, and versatility, enabling you to create innovative solutions for your customers. With our state-of-the-art manufacturing facilities and experienced team of engineers, we provide customized microchip solutions that meet your specific requirements. Our commitment to quality and customer satisfaction ensures that you get the best value for your investment. Partner with us and take your business to new heights with our advanced microchip technology!',
  imageUrls: [],
  comments: [],
  bids: [],
});

const betterPrius = new Idea({
  owner: stephen._id,
  title: 'Better Prius',
  body: 'We are thrilled to introduce our top-of-the-line car model that redefines luxury, performance, and safety! Our car boasts an array of innovative features such as advanced driver-assist technologies, state-of-the-art infotainment system, and premium sound system. With exceptional design and engineering, our car delivers unparalleled performance, handling, and fuel efficiency. Our commitment to quality and reliability ensures that you enjoy a worry-free driving experience. Our knowledgeable sales team and experienced service technicians are dedicated to providing exceptional customer service and support. Come experience the ultimate driving pleasure with our exceptional car model!',
  imageUrls: [],
  comments: [],
  bids: [],
});

const elonsTwin = new Idea({
  owner: daniel._id,
  title: 'Not SpaceX',
  body: 'We are proud to present our comprehensive aerospace solutions that cater to the ever-evolving needs of the industry! Our state-of-the-art aircraft, propulsion, and space systems offer unmatched performance, efficiency, and safety. With our expertise in design, engineering, and manufacturing, we provide customized solutions that meet your specific requirements. Our commitment to quality and innovation has earned us a reputation as a trusted partner in the aerospace industry. Our highly skilled team of engineers, technicians, and support staff work closely with you to deliver on-time and on-budget solutions. Partner with us and soar to new heights with our advanced aerospace solutions!',
  imageUrls: [],
  comments: [],
  bids: [],
});

const swa = new Idea({
  owner: omar._id,
  title: 'AWS 2.0',
  body: 'We are excited to introduce our cutting-edge sports industry technology that will revolutionize the way athletes train, compete, and perform! Our state-of-the-art systems offer real-time data analysis, performance tracking, and personalized training programs that help athletes achieve their full potential. With our innovative technologies, coaches and trainers can monitor individual and team performance, identify areas for improvement, and make data-driven decisions to optimize training and game strategies. Our knowledgeable team of sports scientists, engineers, and data analysts work closely with you to develop customized solutions that meet your unique requirements. Partner with us and take your sports team to the next level with our advanced technology!',
  imageUrls: [],
  comments: [],
  bids: [],
});

const azureWho = new Idea({
  owner: users[5]._id,
  title: 'Azuuure',
  body: 'We are excited to present our advanced cloud systems that provide secure, reliable, and scalable solutions for your business needs! Our cutting-edge technology offers real-time data access, secure data storage, and flexible computing resources, enabling you to optimize your operations and maximize productivity. With our customizable cloud systems, you can tailor the infrastructure to meet your unique requirements, and our expert team provides continuous support and maintenance to ensure that your cloud system is always up and running. Partner with us and take your business to the next level with our advanced cloud systems!',
  imageUrls: [],
  comments: [],
  bids: [],
});

const demoIdea = new Idea({
  owner: users[6]._id,
  title: 'SMS',
  body: 'We are thrilled to introduce our innovative systems modeling software that enables you to design and optimize complex systems with ease! Our software offers advanced modeling and simulation capabilities, allowing you to visualize and analyze the behavior of your systems before implementation. With our software, you can improve system performance, reduce development costs, and minimize risk. Our experienced team of engineers and software developers work closely with you to customize the software to your unique requirements and provide comprehensive training and support to ensure your success. Partner with us and streamline your system development process with our advanced modeling software!',
  imageUrls: [],
  comments: [],
  bids: [],
});

const scrubDaddy = new Idea({
  owner: users[7]._id,
  title: 'Scrub Granddaddy',
  body: 'Introducing the new and improved Scrub Daddy - the revolutionary cleaning tool that makes tough cleaning jobs a breeze! Our innovative design features FlexTexture® foam that adjusts to your water temperature, providing a gentle yet effective scrubbing experience. With its smiley face shape and versatile features, the Scrub Daddy can clean dishes, countertops, and even tough outdoor surfaces. Our commitment to quality and customer satisfaction ensures that you get the best value for your investment. Join the millions of satisfied customers and upgrade your cleaning game with the new Scrub Daddy!',
  imageUrls: [],
  comments: [],
  bids: [],
});

const bofA = new Idea({
  owner: users[8]._id,
  title: 'BofA',
  body: 'We are excited to present our user-friendly banking app that provides secure, convenient, and efficient banking services on-the-go! With our app, you can check your account balances, transfer funds, pay bills, and even deposit checks with just a few taps on your phone. Our cutting-edge security features ensure that your transactions are safe and secure. With our customizable app, you can tailor the interface to meet your unique preferences, and our expert team provides continuous support and maintenance to ensure that you have the best banking experience. Partner with us and take your banking to the next level with our innovative app!',
  imageUrls: [],
  comments: [],
  bids: [],
});

const seederz = new Idea({
  owner: users[9]._id,
  title: 'Mentor.io',
  body: 'We are excited to present our innovative seeding platform that connects startups with investors, accelerators, and mentors! Our platform offers a streamlined process for startups to showcase their ideas, get feedback from experts, and secure funding to launch their ventures. With our advanced matching algorithms, we match startups with the most suitable investors and accelerators based on their preferences and requirements. Our commitment to quality and transparency ensures that all parties have a seamless and trustworthy experience. Our experienced team of entrepreneurs, investors, and mentors provide guidance and support to startups at every stage of their journey. Join our growing community and turn your ideas into successful businesses with our innovative seeding platform!',
  imageUrls: [],
  comments: [],
  bids: [],
});

const glowGrip = new Idea({
  owner: demo._id,
  title: 'Glow Grip',
  body: 'GlowGrip is the ultimate solution to your nighttime safety needs. It’s a high-performance grip tape that glows in the dark, providing superior visibility and ensuring your safety in low light conditions. Whether you’re jogging, biking, or walking your dog, GlowGrip helps you stay visible to others on the road. Made from high-quality, durable materials, GlowGrip is easy to apply and can be used on any surface, including metal, wood, plastic, and concrete. Its unique adhesive formula ensures a strong, long-lasting grip, even in wet or slippery conditions. GlowGrip is available in a variety of colors and sizes to fit your specific needs. Its unique, long-lasting glow technology means it doesn’t require any external power source and can be recharged simply by exposing it to light. Stay safe and be seen with GlowGrip - the ultimate solution for nighttime safety!',
  imageUrls: [],
  comments: [],
  bids: [],
});

const sustainBox = new Idea({
  owner: demo._id,
  title: 'SustainiBox+',
  body: 'SustainiBox is the eco-friendly solution for your packaging needs. This innovative product is made from sustainable, biodegradable materials that help reduce waste and protect the environment. Whether you’re shipping products or storing items, SustainiBox offers a durable and reliable solution that’s kind to the planet. Its unique design allows for easy assembly and sealing, ensuring your items are protected during transit or storage. SustainiBox is available in a variety of sizes and shapes to suit your needs. Its stackable design makes it easy to store and transport, while its sturdy construction provides maximum protection for your items. Made from natural, biodegradable materials, SustainiBox is safe for the environment and can be disposed of easily without harming wildlife or polluting the earth. Its unique materials also make it a great alternative to traditional packaging options that can harm the planet. SustainiBox is the perfect solution for businesses and individuals looking to reduce their carbon footprint and make a positive impact on the environment. Join the sustainable packaging movement with SustainiBox!',
  imageUrls: [],
  comments: [],
  bids: [],
});

const cleanSweep = new Idea({
  owner: demo._id,
  title: 'Clean Sweep+',
  body: 'CleanSweep+ is the ultimate cleaning solution for your home. This powerful, multi-purpose cleaner is designed to tackle tough stains and grime on a variety of surfaces, including floors, walls, countertops, and appliances. Made with natural, non-toxic ingredients, CleanSweep+ is safe for use around children and pets. Its unique formula is tough on dirt and stains, yet gentle on your surfaces. Whether you need to clean up spills in the kitchen or remove scuff marks from your floors, CleanSweep+ gets the job done without leaving any residue or harsh chemical odors. With its easy-to-use spray bottle, CleanSweep+ makes cleaning a breeze. Simply spray it onto the surface you want to clean and wipe it away with a damp cloth or sponge. Its versatile formula can be used on a wide range of surfaces, including hardwood, tile, and carpet. CleanSweep+ comes in a variety of refreshing scents, including lavender, lemon, and eucalyptus. So not only does it leave your home sparkling clean, but it also leaves it smelling fresh and inviting. Say goodbye to tough stains and grime with CleanSweep+ - the ultimate cleaning solution for your home.',
  imageUrls: [],
  comments: [],
  bids: [],
});

ideas.push(
  chatter,
  intelWishes,
  betterPrius,
  elonsTwin,
  swa,
  azureWho,
  demoIdea,
  scrubDaddy,
  bofA,
  seederz,
  glowGrip,
  sustainBox,
  cleanSweep
);

for (let i = 0; i < ideas.length; i++) {
  for (let j = 1; j < 4; j++) {
    ideas[i].imageUrls.push(
      `https://ey-aws-mern-orcastra.s3.us-west-1.amazonaws.com/public/${i}_${j}.jpeg`
    );
  }
}

ideas.forEach((idea) => {
  users.forEach((user) => {
    if (idea.owner === user._id) {
      user.ideas.push(idea);
    }
  });
});

// SEED COMMENTS
const comments = [];

for (const idea of ideas) {
  let randCommentGen = Math.floor(Math.random() * 20) + 1;
  const comment = new Comment({
    text: faker.random.words(randCommentGen),
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    idea: idea._id,
  });
  comments.push(comment);
  idea.comments.push(comment);
}

comments.forEach((comment) => {
  users.forEach((user) => {
    if (user._id === comment.author) user.comments.push(comment);
  });
});

const bids = [];
for (const idea of ideas) {
  const bid = new Bid({
    bidAmount: Math.floor(Math.random() * 100),
    bidder: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    idea: idea._id,
  });
  bids.push(bid);
  idea.bids.push(bid);
}

bids
  .sort((a, b) => a - b)
  .forEach((bid) => {
    users.forEach((user) => {
      if (user._id === bid.bidder) user.bids.push(bid);
    });
  });

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
  User.collection
    .drop()
    .then(() => Idea.collection.drop())
    .then(() => Comment.collection.drop())
    .then(() => Bid.collection.drop())
    .then(() => User.insertMany(users))
    .then(() => Idea.insertMany(ideas))
    .then(() => Comment.insertMany(comments))
    .then(() => Bid.insertMany(bids))
    .then(() => {
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};
