require('dotenv').config();

import mongoose from 'mongoose';

beforeAll(function(done) {
  /*
    Define clearDB function that will loop through all
    the collections in our mongoose connection and drop them.
  */
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteOne(function() {});
    }
    return done();
  }

  /*
    If the mongoose connection is closed,
    start it up using the test url and database name
    provided by the node runtime ENV
  */
  if (mongoose.connection.readyState === 0) {
    mongoose.set('useCreateIndex', true);
    mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      console.log(`🛰  Ready to clear DB & Test`);
      return clearDB();
    })
    .catch(err => console.log(`error : ${err}`));
  } else {
    return clearDB();
  }
});

beforeEach(function(done) {
  return done();
});

afterEach(function(done) {
  return done();
});

afterAll(done => {
  mongoose.disconnect();
  return done();
});
