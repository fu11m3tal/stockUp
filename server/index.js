const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const TOKEN = "brt2jjnrh5rd6rsr6mag"
const axios = require('axios');
const db = require('../database/index');
const controllers = require('../database/controllers.js')
const stock = require('./controllers.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public'));

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
app.post('/api/favorites', controllers.add_to_favorites)


//API Controllers to finnhub
app.get('/api/stock/news', stock.companyNews)
app.get('/api/stock/company/profile', stock.companyProfile)


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

