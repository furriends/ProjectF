import { connect } from 'react-redux'
import {
  getLocationsWithAllBreeds, getLocationsWithAllAnimals, getLocationsWithCity, reseedDB, queryDelete
} from '../modules/advanced'

import AdvancedList from '../components/AdvancedList'

const mapDispatchToProps = {
  getLocationsWithAllBreeds : () => getLocationsWithAllBreeds(),
  getLocationsWithAllAnimals : () => getLocationsWithAllAnimals(),
  getLocationsWithCity : (city) => getLocationsWithCity(city),
  reseedDB : () => reseedDB(),
  queryDelete : (name) => queryDelete(name)
}

const mapStateToProps = (state) => ({
  locationsWithAllAnimals: state.advanced.locationsWithAllAnimals,
  locationsWithAllBreeds: state.advanced.locationsWithAllBreeds,
  locationsWithCity: state.advanced.locationsWithCity,
})

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedList)
