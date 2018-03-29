import { connect } from 'react-redux'
import {
  getApplicantApplications, getOverseenApplications, getAllApplications, queryApplications
} from '../modules/applications'


import ApplicationsList from '../components/ApplicationsList'

const mapDispatchToProps = {
  getApplicantApplications : (applicantId) => getApplicantApplications(applicantId),
  getOverseenApplications : (userId) => getOverseenApplications(userId),
  getAllApplications : () => getAllApplications(),
  queryApplications : (query) => queryApplications(query)
}

const mapStateToProps = (state) => ({
  applications : state.applications.applications,
  auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsList)
