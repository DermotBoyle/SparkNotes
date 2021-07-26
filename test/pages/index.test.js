import React from 'react'

import { cleanup, fireEvent, render, act, screen } from '@testing-library/react'
import MainComponent from 'pages/home/index.js'
import { AppContext } from 'context/global-state'

import * as nextRouter from 'next/router'

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children)
  return { Transition: FakeTransition }
})

const WrapperProvider = (mockDispatch, mockState) => {
  return render(
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

describe('<MainComponent/>', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  it('should render the side menu', async () => {
    const mockDispatch = jest.fn()
    const mockState = { currentURL: '/home' }
    nextRouter.useRouter = jest.fn()
    nextRouter.useRouter.mockImplementation(() => ({
      route: '/home',
      query: { section: '/' }
    }))

    WrapperProvider(mockDispatch, mockState)

    const element = screen.getByTestId('side-menu')

    expect(element).toBeInTheDocument()
  })

  it('should render the view-all component', async () => {
    const mockDispatch = jest.fn()
    const mockState = { currentURL: '/home' }
    nextRouter.useRouter = jest.fn()
    nextRouter.useRouter.mockImplementation(() => ({
      route: '/home',
      query: { section: '/' }
    }))
    WrapperProvider(mockDispatch, mockState)

    expect(asFragment).toMatchSnapshot()
  })
})
