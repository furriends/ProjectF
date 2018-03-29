import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/ApplicationsHeader.scss'

class Applications extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'ApplicationsHeaderWrapper'}>
        <div className={'leftSide'}>
          Advanced
        </div>
        <div className={'rightSide'}>

          <div className={'viewApplicationsButton'} onClick={() => {browserHistory.push('/search')}}>
            Search Animals
          </div>

          <div className={'viewApplicationsButton'} onClick={() => {browserHistory.push('/account')}}>
            My Account
          </div>

        </div>
      </div>
    )
  }
}

export default Applications
