/* eslint-disable react/display-name */
import React from 'react'
import { ViewAll, About, Find } from 'components/views'
import { transitionStyles } from 'utils/transition-manager/transition-manager'
import { fireEvent, render, act, screen } from '@testing-library/react'
import MainComponent from 'pages/home/index.js'
import { AppContext } from 'context/global-state'
import preloadAll from 'jest-next-dynamic'
import * as nextRouter from 'next/router'
import { NotePicker } from 'components/note-picker'

// eslint-disable-next-line react/display-name
// eslint-disable-next-line @next/next/no-img-element
jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />)
jest.mock('crypto', () => ({
  randomBytes: num => new Array(num).fill(0)
}))

jest.mock('utils/helpers/fetcher', () => ({
  fetcher: jest.fn().mockResolvedValueOnce([]),
  readData: jest.fn().mockResolvedValue([])
}))

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

  it('should change view onClick of nav item', async () => {
    const mockDispatch = jest.fn()
    const mockState = { currentURL: '/home' }
    nextRouter.useRouter = jest.fn()
    nextRouter.useRouter.mockImplementation(() => ({
      route: '/home',
      query: { section: '/' },
      push: jest.fn()
    }))

    const { baseElement } = render(WrapperProviderMain(mockDispatch, mockState))

    const element = screen.getByText('view all')
    fireEvent.click(element)

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
      )(<NotePicker allNotes={allNotes} isLoading={false} />)
    )
    const items = screen.getAllByText('testSubject')

    expect(items.length).toBe(3)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render the NotePicker component with NO DATA', async () => {
    fetchMock.once([])
    const mockDispatch = jest.fn()
    const mockState = { currentURL: '/view-all' }
    const { baseElement } = render(
      WrapperProviderComp(
        mockDispatch,
        mockState
      )(
        <ViewAll transitionStyles={transitionStyles}>
          <NotePicker allNotes={[]} isLoading={false} />
        </ViewAll>
      )
    )

    const element = screen.getByText('All Notes')
    const message = await screen.findByText('No notes to show')

    expect(element).toBeInTheDocument()

    expect(message).toBeInTheDocument()
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

    const element = screen.getByText('--About the solution --')

    expect(element).toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })

  it('should render the Find component', () => {
    const mockDispatch = jest.fn()
    const mockState = { currentURL: '/find' }
    const { baseElement } = render(
      WrapperProviderComp(
        mockDispatch,
        mockState
      )(<Find transitionStyles={transitionStyles} />)
    )

    const element = screen.getByText('Find Section Here')

    expect(element).toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })
})
