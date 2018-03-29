import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/CityLocations.scss'
import LocationCard from './LocationCard';

class CityLocations extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'LocationsInCityWrapper'}>

        <div className={'LocationsInCityInner'}>

          <div className={'LocationInputWrapper'}>
            <div className={'LocationInputButton'} onClick={() => {this.props.action(document.getElementById('Location-Input').value)}} >
              Get locations with this city
            </div>

            <input id='Location-Input' className={'LocationInput'} />

          </div>

          <div className={'ListOfLocations'}>

            {
              this.props.data.map((item) => {
                return (
                  <LocationCard title={item.name} />
                )
              })
            }

          </div>
        </div>
      </div>
    )
  }
}

export default CityLocations
