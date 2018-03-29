import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Details.scss'

class Details extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'DetailsWrapper'}>

        <div className={'DetailsInner'}>


          <div>
            {this.props.data ? "Hey, " + this.props.data.name : null}
          </div>

        </div>

      </div>
    )
  }
}

export default Details
