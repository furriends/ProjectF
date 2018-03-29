import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Animal.scss'
import Details from './Details';
import About from './About';
import {deleteAnimal, updateAnimal} from "../modules/animal";


class Animal extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.animal == null && nextProps.animalId != null) {
      this.props.getAnimal(nextProps.animalId);
    } else if ((this.props.animal != null) && (this.props.animalId != nextProps.animal.animalId) && (nextProps.animalId != null)) {
      this.props.getAnimal(nextProps.animalId);
    }
  }


  render () {

    return (
      <div className={'AnimalWrapper'}>

        <About data={this.props.animal} auth={this.props.auth} deleteAnimal={this.props.deleteAnimal} updateAnimal={this.props.updateAnimal} />
        <Details data={this.props.animal} />

      </div>
    )
  }
}

export default Animal
