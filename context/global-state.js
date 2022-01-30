import { createContext, useContext, useReducer } from 'react'

import { appReducer } from './app-reducer'

export const AppContext = createContext()

export function AppWrapper ({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    currentURL: '/home',
    currentNote: '',
    savedNotes:[]
  })

  const value = { state, dispatch }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext () {
  return useContext(AppContext)
}
