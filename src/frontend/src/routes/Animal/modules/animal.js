import axios from 'axios'
import {browserHistory} from 'react-router';
// ------------------------------------
// Constants
// ------------------------------------

export const GET_ANIMAL = 'GET_ANIMAL'
export const DELETE_ANIMAL = 'DELETE_ANIMAL'
export const UPDATE_ANIMAL = 'UPDATE_ANIMAL'
export const SET_ANIMAL_ID = 'SET_ANIMAL_ID'


// ------------------------------------
// Actions
// ------------------------------------

export const setAnimalId = (id) => {
  return {
    type: SET_ANIMAL_ID,
    id: id
  }
}

export const getAnimal = (id) => {
  const request = axios.post('/animal/getone', {
    animalId: id
  })

  return {
    type: GET_ANIMAL,
    payload: request
  }
}

export const deleteAnimal = (id) => {
  const request = axios.post('/animal/delete', {
    animalId: id
  })

  browserHistory.push('/search');

  return {
    type: DELETE_ANIMAL,
    payload: request
  }
}

export const updateAnimal = (animal) => {
  const request = axios.post('/animal/update', {
    ...animal
  })

  return {
    type: UPDATE_ANIMAL,
    payload: request
  }
}


export const actions = {
  getAnimal,
  deleteAnimal,
  setAnimalId
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ANIMAL]    : (state, action) => ({
    ...state,
    animal: action.payload.data ? action.payload.data : state.animal,
    animalId: action.payload.data ? action.payload.data.animalId : state.animalId,
  }),
  [SET_ANIMAL_ID]    : (state, action) => ({
    ...state,
    animalId: action.id,
  }),
  [UPDATE_ANIMAL]    : (state, action) => ({
    ...state,
    animal: action.payload.data ? action.payload.data : state.animal,
    animalId: action.payload.data ? action.payload.data.animalId : state.animalId,
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  animal: null,
  animalId: null
}

export default function animalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
