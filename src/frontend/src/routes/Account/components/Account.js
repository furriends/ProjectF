import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Animal.scss'
import Details from './Details';
import About from './About';

class Account extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  componentDidMount() {
    if (this.props.auth != null) {
      this.props.getAccount(this.props.auth.phone, this.props.auth.userType);
    } else {
      browserHistory.push('/');
    }
  }

  render () {

    return (
      <div className={'AnimalWrapper'}>

        <About data={this.props.account} />
        <Details data={this.props.account} />

      </div>
    )
  }
}

export default Account
