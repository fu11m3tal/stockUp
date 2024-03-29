import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CompanyCard from './CompanyCard.jsx';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_input: '',
      results: {
        AAPL: {
          country: "US",
          currency: "USD",
          exchange: "NASDAQ NMS - GLOBAL MARKET",
          finnhubIndustry: "Technology",
          ipo: "1980-12-12",
          logo: "https://static.finnhub.io/logo/,87cb30d8-80df-11ea-8951-00000000092a.png",
          marketCapitalization: 1578175,
          name: "Apple Inc",
          phone: "14089961010",
          shareOutstanding: 4334.335,
          ticker: "AAPL",
          weburl: "https://www.apple.com/"
        }
      },
      profiles: []
    }
    this.get_company_profile = this.get_company_profile.bind(this);
    this.handle_search_input_change = this.handle_search_input_change.bind(this);
    this.handle_search_button_click = this.handle_search_button_click.bind(this);
  }
  get_company_profile() {
    const symbol = this.state.search_input;
    axios.get(`/api/search/company/${symbol}`)
      .then(response => {
        const company = response.data;
        const results = this.state.results;
        if(results.hasOwnProperty(symbol)) false
        if(!results.hasOwnProperty(symbol)) results[symbol] = company;
        this.setState({results})
      })
      .then(response => {
        console.log(this.state)
      })
      .catch(err => {
        console.log(err);
      })
  }
  handle_search_input_change(e) {
    var search_input = e.target.value
    this.setState({search_input});
  }

  handle_search_input_reset() {
    const search_input = "";
    this.setState({search_input})
  }

  handle_search_button_click() {
    this.get_company_profile();
    this.handle_search_input_reset();
  }

  render() { 
    const useStyles = makeStyles((theme) => ({
      root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      search: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    }));
    // const classes = useStyles();
    return (
      <div>
        <TextField 
          id="search_input" 
          label="Filled" 
          variant="filled" 
          value={this.state.search_input} 
          onChange={this.handle_search_input_change}
        />
        <Button 
          id="search_button" 
          variant="contained" 
          color="primary" 
          onClick={this.handle_search_button_click}
        >
          Search
        </Button>
        {Object.values(this.state.results).map(company => (
          <CompanyCard 
            company={company} 
          />
        ))}
      </div>
    )
  }
}

export default Search;
