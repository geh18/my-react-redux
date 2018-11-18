
const KEY = 'store'

export const loadState = () => {
    try {
        const store = localStorage.getItem(KEY)
        return (store === null) ? undefined : JSON.parse(store)
    } catch (err) {
      return undefined
    }
}

export const saveState = (state) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch (err) {
      // Log
  }
}
