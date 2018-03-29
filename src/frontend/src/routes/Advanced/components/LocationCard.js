import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/LocationCard.scss'

class Results extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'LocationCardWrapper'}>

        <div className={'LocationCardInner'}>

          <div className={'content'}>
            <div className={'title'}>{this.props.title}</div>
          </div>

        </div>
      </div>
    )
  }
}

export default Results
