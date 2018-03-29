import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/ResultCard.scss'
import ResultCard from './ResultCard';

class Results extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {

    return (
      <div className={'ResultCardWrapper'} onClick={() => {browserHistory.push('/animal?id=' + this.props.data.animalId)}}>

        <div className={'ResultCardInner'}>

          <img className={'image'} src={this.props.data.imgUrl} />

          <div className={'content'}>
            <div className={'title'}>{this.props.data.animalName}</div>
            <div className={'breed'}>Sex: {this.props.data.sex}</div>
            <div className={'location'}>Adoption Fee: ${this.props.data.price}</div>
          </div>

        </div>

      </div>
    )
  }
}

export default Results
