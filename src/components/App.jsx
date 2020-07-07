import React, { useEffect } from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import NewsCard from './NewsCard.jsx';
import TOKEN from '../../certification/config';
import List from './List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
      companies: ["AAPL", "GOOGL", "TSLA", "AMZN"],
      favorites: [],
      news: [],
      price_target: {},
      list: {
        AAPL: {symbol: "AAPL", price: "-"},
        AMZN: {symbol: "AMZN", price: "-"},
        TSLA: {symbol: "TSLA", price: "-"},
        GOOGL: {symbol: "GOOGL", price: "-"},
      }
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
    const socket = new WebSocket('wss://ws.finnhub.io?token=brt2jjnrh5rd6rsr6mag');
    socket.addEventListener('open', (event) => {
      const {companies} = this.state;
      companies.map((company) => {
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': company}));
      })
    });
    socket.addEventListener('message', ({data}) => {
      /* set parses data returned from Websocket as object with keys (p = price, s = symbol, t = transaction, v = version)
        Example Response After Parsed:
        var set = {
          p: 373.25,
          s: "AAPL",
          t: 1594154750241,
          v: 25,
        }
      */
      var set = JSON.parse(data).data[0];
      var {list} = this.state;
      console.log(set)
      if(!list.hasOwnProperty(set.s)) list[set.s] = {symbol: set.s, price: null};
      list[set.s].price = set.p;
      this.setState({list})
    });
  }
  update_price(input) {
    console.log(input)
  }

  componentDidMount() {
    this.get_price_target("AAPL")
  }

  render() { 
    var { news, companies, list } = this.state;

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}

    return (
      <div>
        <h1>{this.state.title}</h1>
        <button onClick={() => {console.log(this.state)}}>State</button>
        <List companies={companies} list={Object.values(list)}/>
        {/* {news.map((news, index) => (
          <NewsCard key={index} news={news} />
        ))} */}
      </div>
    )
  }
}

export default App;
