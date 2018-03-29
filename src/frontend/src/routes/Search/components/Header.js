import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Header.scss'

class Header extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'header'}>

        <div className={'viewApplicationsButton'} onClick={() => {browserHistory.push('/applications')}}>
          View {this.props.auth.userType == 'applicant' ? 'My' : ''} Applications
        </div>

        <div className={'viewAccountButton'} onClick={() => {browserHistory.push('/account')}}>
          My Account
        </div>

        { this.props.auth.userType == 'staff' ?
          <div className={'viewAccountButton'} onClick={() => {browserHistory.push('/advanced')}}>
            Advanced
          </div>
          :
          null
        }

      </div>
    )
  }
}

export default Header
