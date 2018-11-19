import undoable from './undoableDecorator'

import { ADD_ITEM, REMOVE_ITEM, SET_FILTER } from '../constants/constants'


const initialState = {
  filter: 'show_all',
  items: [1,2,3,4,5,6,7,8,9]
}



const listData = (state = initialState, action) => {
  switch (action.type){
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.name]
      }
    case REMOVE_ITEM:
      const key = action.key
      console.log(state)
      return {
        ...state,
        items: [...state.items.slice(0, key), ...state.items.slice(key + 1)]
      }
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state
  }
}

export default undoable(listData)
