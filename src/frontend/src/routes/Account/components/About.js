import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/About.scss'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: 60
    }
  }

  componentWillMount () {
  }

  componentDidMount () {

  };

  updateProfile = () => {

    this.props.updateAccount({


    })
  }

  render () {

    return (
      <div className={'AboutWrapper'}>
        <div className={'AboutInner'}>

          <div className={'title'}>
            {this.props.data ? this.props.data.name : null}
          </div>

          <div className={'item'}>
            <div className={'description'}>Name:</div><input id="animal-species" type="text" name="species" placeholder={this.props.data ? this.props.data.name : ''} />
          </div>

          <div className={'item'}>
            <div className={'description'}>Phone:</div><input id="animal-breed" type="text" name="species" placeholder={this.props.data ? this.props.data.phone : ''} />
          </div>

          <div className={'item'}>
            <div className={'description'}>User Type:</div><input type="text" name="age" placeholder={this.props.data ? this.props.data.userType : ''} />
          </div>

          {/*<div className={'deleteButton'} onClick={this.updateProfile}>*/}
            {/*Update this Account*/}
          {/*</div>*/}

        </div>
      </div>
    )
  }
}

export default Profile
