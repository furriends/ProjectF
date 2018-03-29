import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Applications.scss'
import AllLocations from './AllLocations';
import CityLocations from './CityLocations';
import AllBreedsLocaitons from './AllBreedsLocations';
import ReseedDB from './ReseedDB';
import QueryDelete from './QueryDelete';

class AdvancedList extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'ApplicationsListWrapper'}>

        {/*<AllLocations data={this.props.locationsWithAllAnimals} action={this.props.getLocationsWithAllAnimals}/>*/}

        <CityLocations data={this.props.locationsWithCity} action={this.props.getLocationsWithCity} />

        <AllBreedsLocaitons data={this.props.locationsWithAllBreeds} action={this.props.getLocationsWithAllBreeds} />

        <QueryDelete action={this.props.queryDelete} />

        {/*<ReseedDB action={this.props.reseedDB} />*/}

      </div>
    )
  }
}

export default AdvancedList
