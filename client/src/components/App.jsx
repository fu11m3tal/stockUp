import React from 'react';
import axios from 'axios';
// import { runInThisContext } from 'vm';
import NewsCard from './NewsCard.jsx';
import TOKEN from '../../../certification/config.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      search_input: '',
      companies: {
        apple: {
          country: "US", 
          currency: "USD", 
          exchange: "NASDAQ NMS - GLOBAL MARKET", 
          finnhubIndustry: "Technology", 
          ipo: "1980-12-12",
          country: "US",
          currency: "USD",
          exchange: "NASDAQ NMS - GLOBAL MARKET",
          finnhubIndustry: "Technology",
          ipo: "1980-12-12",
          logo: "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
          marketCapitalization: 1490968,
          name: "Apple Inc",
          phone: "14089961010",
          shareOutstanding: 4334.335,
          ticker: "AAPL",
          weburl: "https://www.apple.com/",
        },
      },
      news: []
    }
    this.handle_search_input_change = this.handle_search_input_change.bind(this);
    this.handle_search_button_click = this.handle_search_button_click.bind(this);
    this.getNews = this.getNews.bind(this);
  }

  handle_search_input_change(e) {
    const search_input = e.target.value;
    console.log(TOKEN);
    this.setState({search_input})
  }

  handle_search_button_click() {
    const { search_input } = this.state;
    axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${search_input }&token=${TOKEN}`)
      .then(response => {
        console.log(response.data)
      })
  }

  getNews() {
    axios.get('https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2020-04-30&to=2020-05-01&token=brt2jjnrh5rd6rsr6mag')
    .then(response => {
      const news = response.data;
      // console.log(response.data[0])
      this.setState({news});
    });
  }

  componentDidMount() {
    this.getNews();
  }

  render() { 
    var {search_input, news} = this.state;
    return (
      <div>
        <h1>{this.state.title}</h1>
        <input id="search_input" value={search_input} onChange={this.handle_search_input_change}></input>
        <button id="search_button" onClick={this.handle_search_button_click}>Search</button>
        {news.map((news, index) => (
          <NewsCard key={index} news={news} />
        ))}
      </div>
    )
  }
}

export default App;
