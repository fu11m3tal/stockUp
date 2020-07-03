const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/stock', {  useNewUrlParser: true, useUnifiedTopology: true, reconnectInterval: 250, family: 4, useCreateIndex: true }).
catch(error => console.log(error))

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
})

db.once('open', () => {
  console.log('mongoose connected successfully');
});

module.exports = db;