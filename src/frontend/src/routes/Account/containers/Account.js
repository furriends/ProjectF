import { connect } from 'react-redux'
import { getAccount, updateAccount } from '../modules/account'


import Account from '../components/Account'


const mapDispatchToProps = {
  getAccount : (id, type) => getAccount(id, type),
  updateAccount : (profile) => updateAccount(profile)
}

const mapStateToProps = (state) => ({
  account : state.account.account,
  auth : state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
