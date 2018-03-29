import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import '../styles/Query.scss'

class RadioQueryItem extends Component {
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
          <input type={'radio'} name={'query-type'} className={'input-radio'} onClick={this.props.action}/>

        </div>

      </div>
    )
  }
}

export default RadioQueryItem
