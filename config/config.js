const env = require('dotenv');
const { default: mongoose } = require('mongoose');

env.config();

const mongoDB = process.env.MONGODB;

const db = mongoose.connect(mongoDB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

module.exports = db;