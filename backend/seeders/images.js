const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User'); 
const Idea = require('../models/Idea'); 

const DEFAULT_PROFILE_IMAGE_URL = 's3://ey-aws-mern-orcastra/public/';

// Connects to the database 
mongoose 
    .connect(db, { useNewUrlParser: true })
    .then (() => {
        console.log('Connected to MongoDB successfully');
        initializeImages();
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });

// Initialize image fields in the db 
const initializeImages = async () => {
    console.log("Initializing profile avatars...");
    await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });

    console.log("Initializing Idea image URLS...");
    await Idea.updateMany({}, { imageUrls: [] });

    console.log("Done!");
    mongoose.disconnect(); 
}