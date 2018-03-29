import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/ApplicationsList.scss'
import ApplicationCard from './ApplicationCard';
import Header from './Header';
import {getApplicantApplications} from "../modules/applications";

class Applications extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  componentDidMount() {
    if (this.props.auth.userType == 'staff') {
      this.props.getAllApplications();
    } else {
      this.props.getApplicantApplications(this.props.auth.phone);
    }
  }

  render () {
    return (
      <div className={'ApplicationsListWrapper'}>

        <Header auth={this.props.auth} />

        <div className={'resultsContent'}>
          {
            this.props.applications ? this.props.applications.map((result) => {

                return (
                  <ApplicationCard application={result} />
                )
              })
              :
              null
          }

        </div>

      </div>
    )
  }
}

export default Applications
