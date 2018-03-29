import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import './HomeView.scss'
import cat from '../assets/cat.jpg';

class HomeView extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  handleLogIn = (type) => {
    if (document.getElementById('email-input').value != '') {
      document.getElementById('bottom-square').classList.add('bottomSquareLoading');
    }
    if (type === 'applicant') {
      this.props.login(document.getElementById('email-input').value, 'applicant')
    } else {
      this.props.login(document.getElementById('email-input').value, 'staff')
    }
  }

  render () {
    return (
      <div className={'HomeView'}>


        <div className={'imgSection'}>

          <div className={'topSquare'}>
          </div>

          <div id='bottom-square' className={'bottomSquare'}>
          </div>

          <img className={'image'} src={cat} />

        </div>

        <div className={'contentSection'}>

          <div className={'title'}>
            Adopt a pet, change a life.
          </div>

          <input id="email-input" placeholder={"Your phone"}/>

          <div className={'getStartedButtonWrapper'}>

            <div className={'getStartedButton'} onClick={() => {this.handleLogIn('applicant')}}>
              Login as Applicant
            </div>
            <div className={'getStartedButton'} onClick={() => {this.handleLogIn('staff')}}>
              Login as Staff
            </div>
          </div>


        </div>

      </div>
    )
  }
}

export default HomeView
