import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/AllLocations.scss'
import LocationCard from './LocationCard';

class ReseedDB extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'LocationsWithAllAnimalsWrapper'}>

        <div className={'LocationsWithAllAnimalsInner'}>

          <div className={'LocationsWithAllAnimalsButton'} onClick={() => {this.props.action()}}>
            Reseed the Databse
          </div>

        </div>
      </div>
    )
  }
}

export default ReseedDB
