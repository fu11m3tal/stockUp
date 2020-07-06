import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import NewsCard from './NewsCard.jsx';
import TOKEN from '../../certification/config';
import List from './List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [{"name":"AAPL","price":159},{"name":"GOOGL","price":237},{"name":"AMZ","price":262},{"name":"TSLA","price":305},{"name":"NETFLX","price":356}],
      favorites: [],
      news: [],
      price_target: {},
      list: []
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

  get_price_target(symbol) {
    axios.get(`/api/stock/company/${symbol}/price`)
      .then(response => {
        // respond.data return an object with keys { symbol, targetHigh, targetLow, targetMean, targetMedian }
        const { symbol, targetMean } = response.data;
        console.log(response.data)
        const { list } = this.state;
        list.push({name: symbol, price: targetMean})
        this.setState({list})
      })
      .then(() => {
        console.log(this.state.list)
      })
      .catch(err => {
        console.log(err);
      })
  }


  componentDidMount() {
    this.get_price_target("AAPL");
    this.get_price_target("GOOGL");
    this.get_price_target("AMZN");
    this.get_price_target("TSLA");
    
  }

  render() { 
    var { news, companies, list } = this.state;
    return (
      <div>
        <h1>{this.state.title}</h1>
        <button onClick={() => {console.log(this.state)}}>State</button>
        <List companies={list}/>
        {/* {news.map((news, index) => (
          <NewsCard key={index} news={news} />
        ))} */}
      </div>
    )
  }
}

export default App;
