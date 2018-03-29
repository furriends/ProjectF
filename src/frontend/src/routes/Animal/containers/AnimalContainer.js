import { connect } from 'react-redux'
import { getAnimal, deleteAnimal, updateAnimal } from '../modules/animal'

import Animal from '../components/Animal'

const mapDispatchToProps = {
  getAnimal : (id) => getAnimal(id),
  deleteAnimal : (id) => deleteAnimal(id),
  updateAnimal : (animal) => updateAnimal(animal)
}

const mapStateToProps = (state) => ({
  animal : state.animal.animal,
  animalId: state.animal.animalId,
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Animal)
