import React from 'react'
import { Find } from 'components/views'
import { transitionStyles } from 'utils/transition-manager/transition-manager'
import { fireEvent, render, act, screen } from '@testing-library/react'
import { WrapperProviderComp, allNotes } from "../../test.utils"

describe('<Find/>', () => {
 

    it('should find two notes in the store', () => {
        const mockDispatch = jest.fn()
        const mockState = { currentURL: '/find', savedNotes: allNotes }
        const { baseElement } = render(
          WrapperProviderComp(
            mockDispatch,
            mockState
          )(<Find transitionStyles={transitionStyles} />)
        )
    
        const input = screen.getByRole("searchbox")
        const button = screen.getByRole("button")
       

        fireEvent.change(input, { target: {value:"keywords" }})
        fireEvent.click(button)

        const listItem = screen.getAllByRole("listitem")

        expect(listItem).toHaveLength(2)
        expect(baseElement).toMatchSnapshot()
      })

      it('should find one note in the store', () => {
        const mockDispatch = jest.fn()
        const mockState = { currentURL: '/find', savedNotes: allNotes }
        const { baseElement } = render(
          WrapperProviderComp(
            mockDispatch,
            mockState
          )(<Find transitionStyles={transitionStyles} />)
        )
    
        const input = screen.getByRole("searchbox")
        const button = screen.getByRole("button")
       

        fireEvent.change(input, { target: {value:"mock" }})
        fireEvent.click(button)

        const listItem = screen.getAllByRole("listitem")

        expect(listItem).toHaveLength(1)
      })

      it('should NOT find any note in the store', () => {
        const mockDispatch = jest.fn()
        const mockState = { currentURL: '/find', savedNotes: allNotes }
        const { baseElement } = render(
          WrapperProviderComp(
            mockDispatch,
            mockState
          )(<Find transitionStyles={transitionStyles} />)
        )
    
        const input = screen.getByRole("searchbox")
        const button = screen.getByRole("button")
       

        fireEvent.change(input, { target: {value:"sdfxbdsf" }})
        fireEvent.click(button)

        const listItem = screen.queryByTestId("list-item")

        expect(listItem).toBeNull()
      })
})