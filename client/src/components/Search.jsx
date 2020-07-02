import React from 'react';
import axios from 'axios';
import TOKEN from '../../../certification/config.js';
import CompanyCard from './CompanyCard.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_input: '',
      results: {},
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

  componentDidMount() {
  }

  render() { 
    var { profiles, results } = this.state;
    var {add_company_to_favorites} = this.props;
    return (
      <div>
        <input id="search_input" value={this.state.search_input} onChange={this.handle_search_input_change}></input>
        <button id="search_button" onClick={this.handle_search_button_click}>Search</button>
        
        <br></br>
        results: {Object.keys(results).length}
        {Object.values(results).map((company) => (
          <CompanyCard company={company} add_company_to_favorites={add_company_to_favorites}/>
        ))}
      </div>
    )
  }
}

export default Search;
