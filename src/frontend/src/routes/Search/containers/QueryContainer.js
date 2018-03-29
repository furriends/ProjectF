import { connect } from 'react-redux'
import { query, getAll, popular, unpopular } from '../modules/search'

import Query from '../components/Query'

const mapDispatchToProps = {
  query : (queryType) => query(queryType),
  getAll : () => getAll(),
  popular: () => popular(),
  unpopular: () => unpopular(),
}

const mapStateToProps = (state) => ({
  popularName: state.search.popularName,
  popularCount: state.search.popularCount,
  unpopularName: state.search.unpopularName,
  unpopularCount: state.search.unpopularCount,
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Query)
