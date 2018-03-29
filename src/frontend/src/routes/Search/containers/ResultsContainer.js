import { connect } from 'react-redux'
import { getSpecies, getBreeds } from '../modules/search'

import Results from '../components/Results'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  results : state.search.results,
  auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(Results)
