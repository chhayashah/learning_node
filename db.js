const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to mongodb server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error', err);
});
db.on('disconnected', () => {
    console.log('Mongodb disconnected');
});

// comment added for testing purposes
module.exports = db;