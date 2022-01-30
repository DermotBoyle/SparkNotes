export const appReducer = (state, { type, payload }) => {
  const { currentURL = '/home', currentNote = {}, newNote = {} } = payload

  switch (type) {
    case 'update': {
      return { ...state, currentURL, savedNotes: state.savedNotes, ...currentNote }
    }
    case 'updateAtId': {
      return { ...state, currentURL, savedNotes: updateNote({ savedNotes:state.savedNotes, currentNote }), currentNote: {}}
    }
    case 'reset': {
      return { ...state, currentURL, savedNotes: state.savedNotes, currentNote: {} }
    }
    case 'save': {
      return { ...state, currentURL, savedNotes:[...state.savedNotes, newNote], currentNote }
    }
    case 'deleteAtId': {
      return {...state, savedNotes: deleteNote({ savedNotes:state.savedNotes, currentNote })}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const updateNote = ({ savedNotes, currentNote }) => savedNotes.map(
  (note) => note._id === currentNote._id ? currentNote : note)

const deleteNote = ({ savedNotes, currentNote }) => savedNotes.filter(
  (note) => note._id !== currentNote._id
)