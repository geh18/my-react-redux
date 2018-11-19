import { ADD_ITEM, REMOVE_ITEM, UNDO_ITEM, REDO_ITEM, SET_FILTER } from '../constants/constants'

export const AddItemAction = name => ({
    type: ADD_ITEM,
    name: name,
})

export const RemoveItemAction = key => ({
    type: REMOVE_ITEM,
    key: key,
})

export const RedoItemAction = key => ({
    type: REDO_ITEM,
})

export const UndoItemAction = key => ({
    type: UNDO_ITEM,
})

export const SetFilterAction = filter => ({
  type: SET_FILTER,
  filter: filter
})
