import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/AllLocations.scss'
import LocationCard from './LocationCard';

class AllBreedsLocations extends Component {
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
            Get locations with all animal breeds
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

export default AllBreedsLocations
