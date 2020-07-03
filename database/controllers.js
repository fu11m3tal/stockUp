const axios = require('axios'); 
const db = require('./index.js');
const Favorites = require ('./models.js')
const TOKEN = "brt2jjnrh5rd6rsr6mag"
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

exports.get_news = (req, res) => {
  const date = new Date();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  axios.get(`https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2020-${0+month}-${0+day}&to=2020-${0+month}-${0+day}&token=${TOKEN}`)
      .then(response => {
        const news = response.data;
        news.sort((a, b) => (b.datetime - a.datetime))
        res.send(news)
      })
      .catch(err => {
        console.log(err);
      })
 }