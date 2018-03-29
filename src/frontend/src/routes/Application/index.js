import { injectReducer } from '../../store/reducers'
import {getApplication, setApplicationId} from "./modules/application";

export default (store) => ({
  path : 'application',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */

    if (nextState.location.query.id) {
      store.dispatch(setApplicationId(nextState.location.query.id));
      store.dispatch(getApplication(nextState.location.query.id));
    }

    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Application = require('./containers/Application').default
      const reducer = require('./modules/application').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'application', reducer })

      /*  Return getComponent   */
      cb(null, Application)

      /* Webpack named bundle   */
    }, 'application')
  }
})
