import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Results.scss'
import ResultCard from './ResultCard';
import Header from './Header';

class Results extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {

    return (
        <div className={'ResultsWrapper'}>

          <Header auth={this.props.auth} />

          <div className={'resultsContent'}>

            {
              this.props.results ? this.props.results.map((result) => {

                return (
                  <ResultCard data={result} />
                )
              })
                :
                null
            }

          </div>

        </div>
    )
  }
}

export default Results
