import { UNDO_ITEM, REDO_ITEM } from '../constants/constants'


export default reducer => {
  
  const stateHistory = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  }

  return function(state = stateHistory.present, action) {
    switch (action.type) {
      case UNDO_ITEM:
        const undoneItem = stateHistory.past.pop()
        if (undoneItem) {
          stateHistory.future.push(undoneItem)
          return undoneItem
        } else {
          return state
        }
      case REDO_ITEM:
        const redoneItem = stateHistory.future.pop()
        if (redoneItem) {
          stateHistory.past.push(redoneItem)
          return redoneItem
        } else {
          return state
        }
      default:
        const newPresent = reducer(state, action)
        stateHistory.past.push(state)
        return newPresent
    }
  }
}
