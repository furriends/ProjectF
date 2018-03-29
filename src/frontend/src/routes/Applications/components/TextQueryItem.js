import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import '../styles/ApplicationsQuery.scss'

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
          <input id={'input-' + this.props.title} className={'input'} />

        </div>

      </div>
    )
  }
}

export default TextQueryItem
