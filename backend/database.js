const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDb = async()=>{
    const db_url = process.env.MONGO_URL;
    await mongoose.connect(db_url);
    console.log('databse connected');
}

const urlModel = mongoose.model('Url', new mongoose.Schema({
    originalUrl: String,
    shortUrl: String
}));

module.exports = { connectDb, urlModel };