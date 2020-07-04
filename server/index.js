const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const TOKEN = "brt2jjnrh5rd6rsr6mag"
const axios = require('axios');
const db = require('../database/index');
const controllers = require('../database/controllers.js')

// const finnhub = require('finnhub');
// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "brt2jjnrh5rd6rsr6mag" // Replace this
// const finnhubClient = new finnhub.DefaultApi()
// finnhubClient.companyProfile2({}, (error, data, response) => {
//   console.log(data)
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public'));

// app.get('/favorites', db.get_favorites)

app.get('/api/search/company/:symbol', (req, res) => {
  const {symbol}  = req.params;
  axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${TOKEN}`)
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        console.log(err);
      })   
});

app.get('/api/favorites', controllers.get_favorites)
app.get('/api/news', controllers.get_news)
app.post('/api/favorites', controllers.add_to_favorites)


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

