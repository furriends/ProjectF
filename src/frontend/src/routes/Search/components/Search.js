import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Search.scss'
import QueryContainer from '../containers/QueryContainer';
import ResultsContainer from '../containers/ResultsContainer';


class Search extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'SearchWrapper'}>
        <QueryContainer />
        <ResultsContainer />
      </div>
    )
  }
}

export default Search
