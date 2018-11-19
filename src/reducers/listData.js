import undoable from './undoableDecorator'

import { ADD_ITEM, REMOVE_ITEM } from '../constants/constants'


const initialState = [1,2,3,4,5,6,7,8,9]


const listData = (state = initialState, action) => {
  switch (action.type){
    case ADD_ITEM:
      return [...state, action.name]
    case REMOVE_ITEM:
      const key = action.key
      return [...state.slice(0, key), ...state.slice(key + 1)]
    default:
      return state
  }
}

export default undoable(listData)
