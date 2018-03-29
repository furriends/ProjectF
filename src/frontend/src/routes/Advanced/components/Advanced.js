import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Applications.scss'
import Header from './Header';
import AdvancedContainer from '../containers/AdvancedContainer';

class Advanced extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'AdvancedWrapper'}>
        <Header />
        <AdvancedContainer />
      </div>
    )
  }
}

export default Advanced
