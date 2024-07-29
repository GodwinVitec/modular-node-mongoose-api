require('dotenv').config({
  path: "./.env"
});

const mongoose = require('mongoose');

const uriString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const uriOptions = process.env.DB_OPTS !== undefined &&
  process.env.DB_OPTS !== '' ? process.env.DB_OPTS : '';

const uri = uriString + uriOptions;
const connectionOptions = {
  tls: false
};

console.log(uri);

function connectMongoose() {
  mongoose.connect(uri, connectionOptions)
    .then(() => {
      console.log('Connected to database');
    })
    .catch(error => {
      console.log(error.message);
    });
}

connectMongoose();

mongoose.connection.on('error', function (err) {
  console.log(err);
}).on('disconnected', function () {
  setTimeout(function () {
    connectMongoose();
  }, 1000);
});