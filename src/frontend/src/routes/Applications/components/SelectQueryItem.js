import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import '../styles/ApplicationsQuery.scss'

class RadioQueryItem extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  handleClick = () => {
    if (document.getElementById('box-' + this.props.title).checked) {
      this.props.onCheck();
    } else {
      this.props.onUnCheck();
    }
  }

  render () {
    return (
      <div className={'TextQueryItemWrapper'}>

        <div className={'queryField'}>

          <div className={'queryTitle'}>
            {this.props.title}
          </div>
          <input id={'box-' + this.props.title} type={'checkbox'} className={'input-radio'} onClick={() => {this.handleClick()}}/>

        </div>

      </div>
    )
  }
}

export default RadioQueryItem
