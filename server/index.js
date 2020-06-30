const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "brt2jjnrh5rd6rsr6mag" // Replace this
const finnhubClient = new finnhub.DefaultApi()
finnhubClient.companyProfile2({}, (error, data, response) => {
  console.log(data)
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));


app.get('/', () => {

});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get('/api', ((req, res) => {
  res.send("Goodbye");
}))