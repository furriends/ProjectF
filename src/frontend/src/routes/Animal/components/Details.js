import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Details.scss'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Animal extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'DetailsWrapper'}>

        <div className={'AnimalDetailsInner'}>

          {this.props.data != null ?
            <img className={'image'} src={this.props.data.imgUrl}/>
            :
            null
          }

        </div>

      </div>
    )
  }
}

export default Animal
