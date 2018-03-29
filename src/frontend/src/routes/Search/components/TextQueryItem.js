import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import '../styles/Query.scss'

class TextQueryItem extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className={'TextQueryItemWrapper'}>

        <div className={'queryField'}>

          <div className={'queryTitle'}>
            {this.props.title}
          </div>
          <input className={'input'} />

        </div>

      </div>
    )
  }
}

export default TextQueryItem
