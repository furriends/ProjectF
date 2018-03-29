import { browserHistory } from 'react-router'

const errorMiddleware = store => next => action => {

  if (!store.getState().auth && browserHistory.getCurrentLocation().pathname != '/') {
    browserHistory.push('/')
  }

  if (action.error && action.error === true) {
    alert(action.payload.response.data);
  } else if (action.payload) {
    if (action.payload.status) {
      if (typeof action.payload.status === 'number' && action.payload.status !== 200 && action.payload.status !== 420) {
        alert(action.payload.response.data);
      }
    }
  }
  return next(action);
};

export default errorMiddleware;
