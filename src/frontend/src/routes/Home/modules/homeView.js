import axios from 'axios'
import {browserHistory} from 'react-router';

// ------------------------------------
// Constants
// ------------------------------------

export const LOGIN = 'LOGIN'

// ------------------------------------
// Actions
// ------------------------------------


export const login = (emailId, userType) => (dispatch) => {
  dispatch(_login(emailId, userType)).then(
    response => {
      if (response.payload.data) {
        browserHistory.push('/search');
      }
    }
  );
};

export const _login = (emailId, userType) => {
  const request = axios.post('/profile', {
    phone: emailId,
    userType: userType
  })

  return {
    type: LOGIN,
    payload: request
  }
}

export const actions = {
  _login
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN]    : (state, action) => ({
    ...state,
    userType: action.payload.data ? action.payload.data.userType : "",
    phone: action.payload.data ? action.payload.data.phone : "",
    name: action.payload.data ? action.payload.data.name : "",
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  email: '',
  userType: '',
  phone: '',
  name: ''
}

export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
