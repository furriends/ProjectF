import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Applications.scss'
import ApplicationsList from '../containers/ApplicationsList';
import ApplicationsQuery from '../containers/ApplicationsQuery';

class Applications extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'ApplicationsWrapper'}>
        <ApplicationsQuery />
        <ApplicationsList />
      </div>
    )
  }
}

export default Applications
