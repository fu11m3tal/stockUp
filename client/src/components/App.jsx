import React from 'react';
import axios from 'axios';
// import { runInThisContext } from 'vm';
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
      priceTarget: {},
    }
    this.getNews = this.getNews.bind(this);
    this.getPriceTarget = this.getPriceTarget.bind(this);
  }

  getFavorites() {
    
  }

  getNews() {
    axios.get('https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2020-04-30&to=2020-05-01&token=brt2jjnrh5rd6rsr6mag')
      .then(response => {
        const news = response.data;
        this.setState({news});
      })
      .catch(err => {
        console.log(err);
      })
  }

  getPriceTarget() {

    axios.get('https://finnhub.io/api/v1/stock/earnings?symbol=AAPL&token=brt2jjnrh5rd6rsr6mag')
      .then(response => {
        const priceTarget = response.data;
        this.setState({priceTarget})
      })
      .catch(err => {
        console.log(err);
      })
  }


  componentDidMount() {
    axios.get('/favorites')
      .then(response => {
        console.log("Response: ", response.data)
      })
  }

  render() { 
    var { news, priceTarget } = this.state;
    return (
      <div>
        <h1>{this.state.title}</h1>
        <button onClick={() => {console.log(this.state)}}></button>
        <Search add_company_to_favorites={this.add_company_to_favorites}/>
        {/* <Line data={priceTarget} />
        {news.map((news, index) => (
          <NewsCard key={index} news={news} />
        ))} */}
      </div>
    )
  }
}

export default App;
