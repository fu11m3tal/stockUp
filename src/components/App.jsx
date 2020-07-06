import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import NewsCard from './NewsCard.jsx';
import TOKEN from '../../certification/config';


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
    axios.get('/api/stock/news')
      .then(response => {
        const news = response.data;
        console.log(news)
        this.setState({news});
      })
      .catch(err => {
        console.log(err);
      })
  }

  get_price_target() {
    axios.get(`https://finnhub.io/api/v1/stock/earnings?symbol=AAPL&token=${TOKEN}`)
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
  }

  render() { 
    var { news } = this.state;
    return (
      <div>
        <h1>{this.state.title}</h1>
        <button onClick={() => {console.log(this.state)}}>State</button>
        <Search />
        {/* {news.map((news, index) => (
          <NewsCard key={index} news={news} />
        ))} */}
      </div>
    )
  }
}

export default App;
