import React from 'react';
import axios from 'axios';
import Line from './Line.jsx';
import Search from './Search.jsx';
import NewsCard from './NewsCard.jsx';
import TOKEN from '../../../certification/config.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      news: [],
      price_target: {},
    }
    this.get_favorites = this.get_favorites.bind(this);
    this.add_to_favorites = this.add_to_favorites.bind(this);
    this.get_news = this.get_news.bind(this);
    this.get_price_target = this.get_price_target.bind(this);
  }

  add_to_favorites() {
    axios.post('api/favorites', {symbol: "APPL"})
  }

  get_favorites() {
    axios.get('/api/favorites')
      .then(response => {
        console.log(response)
      })
  }

  get_news() {
    var date = new Date();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    console.log(5)
    axios.get(`https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2020-${0+month}-${0+day}&to=2020-${0+month}-${0+day}&token=brt2jjnrh5rd6rsr6mag`)
      .then(response => {
        const news = response.data;
        news.sort((a, b) => (b.datetime - a.datetime))
        this.setState({news});
      })
      .catch(err => {
        console.log(err);
      })
  }

  get_price_target() {

    axios.get('https://finnhub.io/api/v1/stock/earnings?symbol=AAPL&token=brt2jjnrh5rd6rsr6mag')
      .then(response => {
        const price_target = response.data;
        this.setState({price_target})
      })
      .catch(err => {
        console.log(err);
      })
  }


  componentDidMount() {
    this.get_news();
    axios.get('/favorites')
      .then(response => {
        console.log("Response: ", response.data)
      })
  }

  render() { 
    var { news, price_target } = this.state;
    return (
      <div>
        <h1>{this.state.title}</h1>
        {news.map((news, index) => (
          <NewsCard key={index} news={news} />
        ))}
      </div>
    )
  }
}

export default App;
