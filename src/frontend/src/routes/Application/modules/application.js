import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------

export const GET_APPLICATION = 'GET_APPLICATION'
export const UPDATE_APPLICATION = 'UPDATE_APPLICATION'
export const CREATE_APPLICATION = 'CREATE_APPLICATION'
export const DELETE_APPLICATION = 'DELETE_APPLICATION'
export const SET_APPLICATION_ID = 'SET_APPLICATION_ID'

// ------------------------------------
// Actions
// ------------------------------------


export const setApplicationId = (id) => {
  return {
    type: SET_APPLICATION_ID,
    id: id
  }
}

export const getApplication = (applicationID) => {
  const request = axios.post('/application/getone', {
    applicationId: applicationID
  })

  return {
    type: GET_APPLICATION,
    payload: request
  }
}

export const updateApplication = (application) => {
  const request = axios.post('/application/update', {
    ...application
  })

  return {
    type: UPDATE_APPLICATION,
    payload: request
  }
}

export const createApplication = (application) => {
  const request = axios.post('/application/create', {
    ...application
  })

  return {
    type: CREATE_APPLICATION,
    payload: request
  }
}

export const deleteApplication = (applicationId) => {
  const request = axios.post('/application/delete', {
    applicationID: applicationId
  })

  return {
    type: DELETE_APPLICATION,
    payload: request
  }
}

export const actions = {
  getApplication,
  updateApplication,
  createApplication,
  deleteApplication,
  setApplicationId,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_APPLICATION]    : (state, action) => ({
    ...state,
    application: action.payload.data ? action.payload.data : state.application,
    applicationId: action.payload.data ? action.payload.data.applicationId : state.applicationId,
  }),
  [DELETE_APPLICATION] : (state, action) => ({
    ...state,
    application: action.payload.data,
  }),
  [UPDATE_APPLICATION] : (state, action) => ({
    ...state,
    application: action.payload.data,
  }),
  [CREATE_APPLICATION] : (state, action) => ({
    ...state,
    application: action.payload.data,
  }),
  [SET_APPLICATION_ID]    : (state, action) => ({
    ...state,
    applicationId: action.id,
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  application: null,
  applicationId: null,
}

export default function applicationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
