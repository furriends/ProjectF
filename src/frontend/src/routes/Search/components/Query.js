import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Query.scss'
import TextQueryItem from './TextQueryItem';
import SelectQueryItem from './SelectQueryItem';
import RadioQueryItem from './RadioQueryItem';

class Query extends Component {
  constructor (props) {
    super(props)
    this.state = {
      init: false,
      popular: null
    }
  }

  componentWillMount () {
  }

  componentDidMount () {
    this.props.getAll();
  }

  render () {
    return (
      <div className={'QueryWrapper'}>

        <div className={'queryInner'}>

          <div className={'title'}>Find your new best friend</div>

          <RadioQueryItem title={'Max Adoption Fee'} action={() => {this.props.query('max')}}/>

          <RadioQueryItem title={'Min Adoption Fee'} action={() => {this.props.query('min')}}/>

          <div className={'queryButton'} onClick={() => {this.props.getAll()}}>
            Reset
          </div>

          <div className={'popularSection'}>

            {(this.props.popular && (this.props.popular != '') && (this.state.init == true)) ?
              <div className={'mostPopularLabel'}>
                {this.state.popular ? 'Breed: ' + this.props.popularName : 'Breed: ' + this.props.unpopularName }
              </div>
              :
              null
            }

            {(this.props.popularCount && (this.props.popularCount != '') && (this.state.init == true)) ?
              <div className={'mostPopularLabel'}>
                {this.state.popular ? 'Count: ' + this.props.popularCount : 'Count: ' + this.props.unpopularCount}
              </div>
              :
              null
            }

            <div className={'popularQueryButton'} onClick={() => {this.props.popular(); this.setState({init: true, popular: true})}}>
              View Most Popular Breed
            </div>

            <div className={'popularQueryButton'} onClick={() => {this.props.unpopular(); this.setState({init: true, popular: false})}}>
              View Least Popular Breed
            </div>
          </div>

        </div>


      </div>
    )
  }
}

export default Query
