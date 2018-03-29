// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'
import SearchRoute from './Search'
import AnimalRoute from './Animal'
import ApplicationsRoute from './Applications'
import AdvancedRoute from './Advanced'
import ApplicationRoute from './Application'
import AccountRoute from './Account'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home(store),
  childRoutes : [
    SearchRoute(store),
    AnimalRoute(store),
    ApplicationsRoute(store),
    AdvancedRoute(store),
    ApplicationRoute(store),
    AccountRoute(store)
  ]
})


export default createRoutes
