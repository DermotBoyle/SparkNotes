export const urlReducer = (state, { type, payload }) => {
  const { currentURL = '/home', currentNote = {} } = payload

  switch (type) {
    case 'update': {
      return { ...state, currentURL, ...currentNote }
    }
    case 'reset': {
      return { ...state, currentURL, currentNote: {} }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
