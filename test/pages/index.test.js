import React from 'react'
import { Home, ViewAll, About } from 'components/views'
import { transitionStyles } from 'utils/transition-manager/transition-manager'
import { cleanup, fireEvent, render, act, screen } from '@testing-library/react'
import MainComponent from 'pages/home/index.js'
import { AppContext } from 'context/global-state'
import preloadAll from 'jest-next-dynamic'

import * as nextRouter from 'next/router'
import { NotePicker } from 'components/note-picker'

const allNotes = {
  data: [
    {
      _id: 1,
      subject: 'testSubject',
      content: 'content',
      keywords: 'keywords',
      created: 'fakeDate',
      updated: 'fakeUpdated'
    },
    {
      _id: 2,
      subject: 'testSubject',
      content: 'content',
      keywords: 'keywords',
      created: 'fakeDate',
      updated: 'fakeUpdated'
    },
    {
      _id: 3,
      subject: 'testSubject',
      content: 'content',
      keywords: 'keywords',
      created: 'fakeDate',
      updated: 'fakeUpdated'
    }
  ]
}

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

describe('<MainComponent/>', () => {
  beforeAll(async () => {
    await preloadAll()
  })

  it('should render the side menu', async () => {
    const mockDispatch = jest.fn()
    const mockState = { currentURL: '/home' }
    nextRouter.useRouter = jest.fn()
    nextRouter.useRouter.mockImplementation(() => ({
      route: '/home',
      query: { section: '/' }
    }))

    const { baseElement } = render(WrapperProviderMain(mockDispatch, mockState))

    const element = screen.getByTestId('side-menu')
    const HomeElement = screen.getByTestId('home')

    expect(HomeElement).toHaveClass('nav-link__active')
    expect(element).toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })

  it('should render the NotePicker component with data', () => {
    const mockDispatch = jest.fn()
    const mockState = { currentURL: '/about' }

    const { baseElement } = render(
      WrapperProviderComp(
        mockDispatch,
        mockState
      )(<NotePicker allNotes={allNotes} />)
    )
    const items = screen.getAllByText('testSubject')

    expect(items.length).toBe(3)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render the view-all component with NO DATA', () => {
    const mockDispatch = jest.fn()
    const mockState = { currentURL: '/home' }
    const { baseElement } = render(
      WrapperProviderComp(
        mockDispatch,
        mockState
      )(<ViewAll transitionStyles={transitionStyles} />)
    )

    const element = screen.getByText('All Notes')

    expect(element).toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })

  it('should render the About component', () => {
    const mockDispatch = jest.fn()
    const mockState = { currentURL: '/about' }
    const { baseElement } = render(
      WrapperProviderComp(
        mockDispatch,
        mockState
      )(<About transitionStyles={transitionStyles} />)
    )

    const element = screen.getByText(
      'This is an about App I built with NextJS and MongoDB'
    )

    expect(element).toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })
})
