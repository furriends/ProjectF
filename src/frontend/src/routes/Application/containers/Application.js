import { connect } from 'react-redux'
import { getApplication, deleteApplication } from '../modules/application'

import Application from '../components/Application'

const mapDispatchToProps = {
  getApplication : (id) => getApplication(id),
  deleteApplication : (id) => deleteApplication(id)
}

const mapStateToProps = (state) => ({
  application : state.application.application,
  applicationId: state.application.applicationId
})

export default connect(mapStateToProps, mapDispatchToProps)(Application)
