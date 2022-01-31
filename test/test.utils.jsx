import React from 'react'
import MainComponent from 'pages/home/index.js'
import { AppContext } from 'context/global-state'

const WrapperProviderMain = (mockDispatch, mockState) => {
  return (
    <AppContext.Provider
      value={{
        dispatch: mockDispatch,
        state: mockState
      }}
    >
      <MainComponent />
    </AppContext.Provider>
  )
}

const WrapperProviderComp = (mockDispatch, mockState) => {
  function WrappedComponent (component) {
    return (
      <AppContext.Provider
        value={{
          dispatch: mockDispatch,
          state: mockState
        }}
      >
        {component}
      </AppContext.Provider>
    )
  }
  return WrappedComponent
}

const constantDate = new Date('2017-06-13T04:41:20')

const allNotes = [
  {
    _id: 1,
    subject: 'testSubject',
    content: 'content',
    keywords: 'keywords',
    created: constantDate,
    updated: constantDate

  },
  {
    _id: 2,
    subject: 'testSubject',
    content: 'content',
    keywords: 'keywords',
    created: constantDate,
    updated: constantDate
  },
  {
    _id: 3,
    subject: 'testSubject',
    content: 'content',
    keywords: 'mock',
    created: constantDate,
    updated: constantDate
  }
]

// override render method
export { WrapperProviderComp, WrapperProviderMain, allNotes }
