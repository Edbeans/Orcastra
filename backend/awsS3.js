const AWS = require("aws-sdk");
const multer = require("multer");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const NAME_OF_BUCKET = "ey-aws-mern-orcastra"; 

module.exports = {
    s3
};

const singleFileUpload = async = ({ file, public = false }) => {
    const { originalname, buffer } = file; 
    const path = require("path");

    const Key = new Data().getTime().toString() + path.extname(originalname);
    const uploadParams = 
}