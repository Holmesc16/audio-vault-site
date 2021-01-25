import React, {Component} from 'react'
import StyledSearchBar from './styles'
import { Input } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import axios from 'axios'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      results: []
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress = e => {
    // debugger;
    let key = e.key
    let searchParam = e.target.value
    if(e.key === 'Enter') {
      axios.get(`http://localhost:5000/search?keyword=${searchParam}`)
      .then(response => this.setState({results: response.data, searchValue: searchParam}))
    }
  }

  render() {
    return (
      <StyledSearchBar>
        <Input
        ref="search"
        type="text"
        // value={this.state.searchValue}
        placeholder="Search..."
        icon='Search'
        onKeyPress={this.handleKeyPress.bind(this)}
        />
        { this.state.results.length > 0 &&
          <Redirect to={{
            pathname: `/search/${this.state.searchValue}`,
            state: {
              from: '/',
              state: this.state
            }
          }} />
        }
      </StyledSearchBar>
    )
  }
}