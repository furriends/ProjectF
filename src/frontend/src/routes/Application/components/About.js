import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/About.scss'

class About extends Component {
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

  updateApplication = () => {

    this.props.updateApplication({


    })
  }

  render () {

    return (
      <div className={'AboutWrapper'}>
        <div className={'AboutInner'}>

          <div className={'title'}>
            Application
          </div>

          <div className={'item'}>
            <div className={'description'}>Type of Home:</div><input id="animal-species" type="text" name="species" placeholder={this.props.application != null ? this.props.application.typeOfHome : ""} />
          </div>

          <div className={'item'}>
            <div className={'description'}>Yearly Budget:</div><input id="animal-breed" type="text" name="species" placeholder={this.props.application != null ? this.props.application.yearlyBudget : ""} />
          </div>

          <div className={'item'}>
            <div className={'description'}>Other Pets:</div><input type="text" name="age" placeholder={this.props.application != null ? this.props.application.otherPets : ""} />
          </div>

          <div className={'item'}>
            <div className={'description'}>Application Status:</div><input id="animal-sex" type="text" name="sex" placeholder={this.props.application != null ? this.props.application.applicationStatus : ""} />
          </div>


        </div>
      </div>
    )
  }
}

export default About
