import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/AllLocations.scss'
import LocationCard from './LocationCard';

class AllLocations extends Component {
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
            Get locations with all animals
          </div>
          <div className={'ListOfLocations'}>

            {
              this.props.data.forEach(item => {
                <LocationCard title={item} />
              })
            }

          </div>
        </div>
      </div>
    )
  }
}

export default AllLocations
