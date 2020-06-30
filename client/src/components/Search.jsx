import React from 'react';
import axios from 'axios';
import TOKEN from '../../../certification/config.js';
import CompanyCard from './CompanyCard.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_input: '',
      results: [],
      profiles: []
    }
    this.get_company_profile = this.get_company_profile.bind(this);
    this.handle_search_input_change = this.handle_search_input_change.bind(this);
    this.handle_search_button_click = this.handle_search_button_click.bind(this);
  }
  get_company_profile(company) {
    axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${company.symbol}&token=${TOKEN}`)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err);
        return err;
      })
  }
  handle_search_input_change(e) {
    var search_input = e.target.value
    axios.get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${TOKEN}`)
    .then((response) => {
      const companies = response.data;
      const profiles = [];
      var results = companies.filter(({symbol}, index) => (symbol.includes(search_input) && symbol[0] === search_input[0]));
      results.forEach((company, index) => {
        if(index < 2) {
          axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${company.symbol}&token=${TOKEN}`)
            .then(response => {
              const {profiles} = this.state;
              var company = response.data;
              profiles.push(company);
              this.setState({profiles})
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
      this.setState({profiles: profiles})
    })
    .then(() => {
      console.log(this.state)
      this.setState({search_input});
    })
    .catch(err => {
      console.log(err);
    })
  }

  handle_search_button_click() {
    const { search_input } = this.state;
    axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${search_input}&token=${TOKEN}`)
      .then(response => {
        this.setState({search_input: ''})
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
  }

  render() { 
    var { profiles } = this.state;
    console.log(profiles)
    return (
      <div>
        <input className="search_input" value={this.state.search_input} onChange={this.handle_search_input_change}></input>
        <button className="search_button" onClick={this.handle_search_button_click}>Search</button>
        results
        {profiles.map((company) => (
          <CompanyCard company={company} />
        ))}
      </div>
    )
  }
}

export default Search;
