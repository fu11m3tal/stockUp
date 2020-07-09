import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import axios from 'axios';
import Search from './Search.jsx';
import NewsCard from './NewsCard.jsx';
import List from './List.jsx';
import Navigation from './Navigation.jsx';
import TransitionsModal from './Modal.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "stocks",
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
    this.handleMenuChange = this.handleMenuChange.bind(this);
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
      var set = JSON.parse(data).data;
      if(set) set = set[0]
      var {list} = this.state;
      if(!list.hasOwnProperty(set.s)) list[set.s] = {symbol: set.s, price: set.p};
      list[set.s].price = set.p;
      this.setState({list})
    });
  }
  update_price(input) {
    console.log(input)
  }

  componentDidMount() {
    this.get_price_target("AAPL")
    this.get_news();
  }

  handleMenuChange(e, cb) {
    var page = e.target.id;
    this.setState({page})
    cb();
  }

  render() { 
    var { page, news, companies, list } = this.state;
    if(page === "stocks") {
      return (
        <div>
          <Navigation handleMenuChange={this.handleMenuChange}/>
          {/* <TransitionsModal/> */}
          <h1>Stocks</h1>
          <button onClick={() => {console.log(this.state)}}>State</button>
          <List companies={companies} list={Object.values(list)}/>
          {/* {news.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))} */}
        </div>
      )
    } else if(page === "search") {
      return (
        <div>
          <Navigation 
            handleMenuChange={this.handleMenuChange}
          />
          <h1>Search</h1>
          <Search />
        </div>
      )
    } else if(page === "news") {
      return (
        <div>
          <Navigation 
            handleMenuChange={this.handleMenuChange}
          />
          <h1>News</h1>
          {news.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </div>
      )
    } else if(page === "settings") {
      return (
        <div>
          <Navigation 
            handleMenuChange={this.handleMenuChange}
          />
          <h1>Settings</h1>
        </div>
      )
    } else if(page === "card") {
      return (
        <div>
          <Navigation 
            handleMenuChange={this.handleMenuChange}
          />
          <h1>Card</h1>
          <TransitionsModal visible={true}/>
        </div>
      )
    }
  }
}

export default App;
