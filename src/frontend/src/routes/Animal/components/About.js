import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/About.scss'
import {deleteAnimal} from "../modules/animal";


class Animal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: 60
    }
  }

  componentWillMount () {
  }

  componentDidMount () {

  };

  updateAnimal = () => {

    let name = (document.getElementById('animal-name').value != '') ? document.getElementById('animal-name').value : this.props.data.animalName;
    // let price = (document.getElementById('animal-price').value != '') ? document.getElementById('animal-price').value : this.props.data.price;
    let sex = (document.getElementById('animal-sex').value != '') ? document.getElementById('animal-sex').value : this.props.data.sex;
    let weight = (document.getElementById('animal-weight').value != '') ? document.getElementById('animal-weight').value : this.props.data.weight;
    let needs = (document.getElementById('animal-needs').value != '') ? document.getElementById('animal-needs').value : this.props.data.specialNeeds;

    this.props.updateAnimal({
      animalId: this.props.data.animalId,
      animalName: name,
      sex: sex,
      specialNeeds: needs,
      weight: weight,
    })

    document.getElementById('animal-name').value = ''
    //document.getElementById('animal-price').value = ''
    document.getElementById('animal-sex').value = ''
    document.getElementById('animal-weight').value = ''
    document.getElementById('animal-needs').value = ''

  }

  render () {

    return (
      <div className={'AboutWrapper'}>
        <div className={'AboutInner'}>

          <div className={'title'}>
            {this.props.data != null ? this.props.data.animalName : ""}
          </div>

          <div className={'item'}>
            <div className={'description'}>Name:</div><input id="animal-name" type="text" name="species" placeholder={this.props.data != null ? this.props.data.animalName : ""} />
          </div>

          {/*<div className={'item'}>*/}
            {/*<div className={'description'}>Price:</div><input id="animal-price" type="text" name="species" placeholder={this.props.data != null ? this.props.data.price : ""} />*/}
          {/*</div>*/}

          <div className={'item'}>
            <div className={'description'}>Sex:</div><input type="text" id="animal-sex" name="age" placeholder={this.props.data != null ? this.props.data.sex : ""} />
          </div>

          <div className={'item'}>
            <div className={'description'}>Weight:</div><input id="animal-weight"  type="text" name="sex" placeholder={this.props.data != null ? this.props.data.weight : ""} />
          </div>

          <div className={'item'}>
            <div className={'description'}>Special Needs:</div><input id="animal-needs" type="text" name="type" placeholder={this.props.data != null ? this.props.data.specialNeeds : ""} />
          </div>

          {this.props.auth.userType == 'staff' ?
            <div className={'deleteButton'} onClick={() => {this.updateAnimal()}}>
            Update this Animal
            </div>
            :
            null
          }

          {this.props.auth.userType == 'staff' ?
            <div className={'deleteButton'} onClick={() => {this.props.deleteAnimal(this.props.data.animalId)}}>
            Delete this Animal
            </div>
            :
            null
          }

        </div>
      </div>
    )
  }
}

export default Animal
