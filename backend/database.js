const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDb = async()=>{
    await mongoose.connect(db_url);
    console.log('databse connected');
}

const urlModel = mongoose.model('Url', new mongoose.Schema({
    originalUrl: String,
    shortUrl: String
}));

module.exports = { connectDb, urlModel };