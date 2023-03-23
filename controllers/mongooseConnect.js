const mongoose = require('mongoose');

const { MDB_URI } = process.env;
// const MDB_URI =
//   'mongodb+srv://guseulgi:qwer1234@cluster0.y4isdtc.mongodb.net/?retryWrites=true&w=majority';

const connect = async () => {
  try {
    await mongoose.connect(MDB_URI, {
      dbName: 'kdt5',
      useNewUrlParser: true,
    });
    console.log('mongoose connect');

    mongoose.connection.on('error', (err) => {
      console.error('mongoDB connection Error');
    });

    mongoose.connection.on('disconnected', () => {
      console.error('mongoDB disconnected, reconnecting...');
      connect();
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connect;
