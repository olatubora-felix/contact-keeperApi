const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
    useNewUrlParser: true,
    })
    console.log("MongoDB Connected....")
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB