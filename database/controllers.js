const axios = require('axios'); 
const db = require('./index.js');
const Favorites = require ('./models.js')

exports.add_to_favorites = (req, res) => {
  const new_favorites = new Favorites(req.body);
  new_favorites.save()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log(err);
  })
}

exports.get_favorites = (req, res) => {
 Favorites.find()
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    console.log(err);
  })
}