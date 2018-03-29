import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/Application.scss'
import Details from './Details';
import About from './About';

class Application extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.applications == null && nextProps.applicationId != null) {
      this.props.getApplication(nextProps.applicationId);
    } else if ((this.props.application != null) && (this.props.applicationId != nextProps.application.applicationId) && (nextProps.applicationId != null)) {
      this.props.getApplication(nextProps.applicationId);
    }
  }

  render () {

    return (
      <div className={'ApplicationWrapper'}>

        <About application={this.props.application} deleteApplication={this.props.deleteApplication} />
        <Details application={this.props.application} />

      </div>
    )
  }
}

export default Application
