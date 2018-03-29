import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/ApplicationCard.scss'

class Applications extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'ApplicationCard'}>

        <div className={'ApplicationCardInner'}>

          <div className={'content'}>

            {/*{ this.props.application.applicationId ? <div className={'item'}>ID: {this.props.application.applicationId}</div> : null }*/}

            { this.props.application.typeOfHome ? <div className={'item'}>Type: {this.props.application.typeOfHome}</div> : null }

            { this.props.application.yearlyBudget ?  <div className={'item'}>Budget: ${this.props.application.yearlyBudget}</div> : null }

            { this.props.application.otherPets ?  <div className={'item'}>Other Pets: {this.props.application.otherPets}</div> : null }

            { this.props.application.applicationStatus ?  <div className={'item'}>Status: {this.props.application.applicationStatus}</div> : null }

            <div onClick={() => {browserHistory.push('/application?id=' + this.props.application.applicationId)}} className={'applicationcard-button'}>View Application</div>
            <div onClick={() => {browserHistory.push('/animal?id=' + this.props.application.animalId)}} className={'applicationcard-button'}>View Animal</div>

          </div>

        </div>

      </div>
    )
  }
}

export default Applications
