import { createStore } from "redux"
import throttle from 'lodash/throttle'

import { loadState, saveState } from './reducers/stateFromLocalstorage'
import reducers from './reducers/reducers'

const configureStore = () => {
  const initialState = loadState()
  const store = createStore(
    reducers,
    undefined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

  store.subscribe(throttle(() => {
      saveState(store.getState())
    }, 1000)
  );

  return store
}

export default configureStore
