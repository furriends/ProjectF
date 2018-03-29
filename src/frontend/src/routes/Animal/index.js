import { injectReducer } from '../../store/reducers';
import { getAnimal, setAnimalId } from './modules/animal';

export default (store) => ({
  path : 'animal',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    if (nextState.location.query.id) {
      store.dispatch(setAnimalId(nextState.location.query.id));
      store.dispatch(getAnimal(nextState.location.query.id));
    }

    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const AnimalContainer = require('./containers/AnimalContainer').default
      const reducer = require('./modules/animal').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'animal', reducer })

      /*  Return getComponent   */
      cb(null, AnimalContainer)

      /* Webpack named bundle   */
    }, 'animal')
  }
})
