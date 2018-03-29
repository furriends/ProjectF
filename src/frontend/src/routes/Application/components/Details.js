import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Details.scss'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Details extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'ApplicationDetailsWrapper'}>

        <div className={'ApplicationDetailsInner'}>

          <div className={'detailsButtonApplication'} onClick={() => {browserHistory.push('/animal?id=' + this.props.application.animalId)}}>
            View Animal
          </div>

        </div>

      </div>
    )
  }
}

export default Details
