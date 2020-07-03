const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favorites_schema = new Schema({
  "id": Number,
  "symbol": String
})


var Favorites = mongoose.model('Favorites', favorites_schema);

module.exports = Favorites; 