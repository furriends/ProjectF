import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import '../styles/Query.scss'

class SelectQueryItem extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {

    return (
      <div className={'SelectQueryItemWrapper'}>
        <div className={'queryField'}>

          <div className={'queryTitle'}>
            {this.props.title}
          </div>

          <select className={'input'} >

            {
              this.props.options.map((option) => {
                return (
                  <option value={option}>{option}</option>
                )
              })
            }

          </select>

        </div>

      </div>
    )
  }
}

export default SelectQueryItem
