import { createContext, useContext, useReducer } from 'react'
import { urlReducer } from './app-reducer'

const AppContext = createContext()

export function AppWrapper ({ children }) {
  const [state, dispatch] = useReducer(urlReducer, {
    currentURL: '/home'
  })

  const value = { state, dispatch }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext () {
  return useContext(AppContext)
}
