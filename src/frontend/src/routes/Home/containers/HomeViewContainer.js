import { connect } from 'react-redux'
import { login } from '../modules/homeView'

import HomeView from '../components/HomeView'

const mapDispatchToProps = {
  login : (emailId, userType) => login(emailId, userType)
}

const mapStateToProps = (state) => ({
  auth : state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
