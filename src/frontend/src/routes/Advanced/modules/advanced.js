import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------

export const GET_ALL_APPLICATIONS = 'GET_ALL_APPLICATIONS'
export const GET_OVERSEEN_APPLICATIONS = 'GET_OVERSEEN_APPLICATIONS'
export const GET_APPLICANT_APPLICATIONS = 'GET_APPLICANT_APPLICATIONS'

export const GET_LOCATIONS_WITH_ALL_ANIMALS = 'GET_LOCATIONS_WITH_ALL_ANIMALS'
export const GET_LOCATIONS_WITH_CITY = 'GET_LOCATIONS_WITH_CITY'
export const GET_LOCATIONS_WITH_ALL_BREEDS = 'GET_LOCATIONS_WITH_ALL_BREEDS'
export const RESEED_DB = 'RESEED_DB'
export const QUERY_DELETE = 'QUERY_DELETE'

// ------------------------------------
// Actions
// ------------------------------------

export const getLocationsWithAllBreeds = () => {
  const request = axios.post('/locations/allbreeds', {
  })

  return {
    type: GET_LOCATIONS_WITH_ALL_BREEDS,
    payload: request
  }
}

export const getLocationsWithAllAnimals = () => {
  const request = axios.post('/locations/allAnimals', {
  })

  return {
    type: GET_LOCATIONS_WITH_ALL_ANIMALS,
    payload: request
  }
}

export const getLocationsWithCity = (city) => {
  const request = axios.post('/locations/query', {
    cityName: city
  })

  return {
    type: GET_LOCATIONS_WITH_CITY,
    payload: request
  }
}

export const queryDelete = (name) => {
  const request = axios.post('/animal/querydelete', {
    name: name
  })

  return {
    type: QUERY_DELETE,
    payload: request
  }
}

export const reseedDB = () => {
  const request = axios.post('/reseed', {
  })

  return {
    type: RESEED_DB,
    payload: request
  }
}

export const actions = {
  getLocationsWithAllBreeds,
  getLocationsWithAllAnimals,
  getLocationsWithCity,
  reseedDB
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_LOCATIONS_WITH_ALL_ANIMALS]    : (state, action) => ({
    ...state,
    locationsWithAllAnimals: action.payload.data ? action.payload.data : state.locationsWithAllAnimals,
  }),
  [GET_LOCATIONS_WITH_CITY] : (state, action) => ({
    ...state,
    locationsWithCity: action.payload.data ? action.payload.data : state.locationsWithCity,
  }),
  [GET_LOCATIONS_WITH_ALL_BREEDS] : (state, action) => ({
    ...state,
    locationsWithAllBreeds: action.payload.data ? action.payload.data : state.locationsWithAllBreeds,
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  locationsWithAllAnimals: [],
  locationsWithAllBreeds: [],
  locationsWithCity: []
}

export default function searchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
