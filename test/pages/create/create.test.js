/* eslint-disable react/display-name */
import * as React from 'react'
import { CreateNoteForm } from 'components/views'
import { transitionStyles } from 'utils/transition-manager/transition-manager'
import { fireEvent, render, screen } from '@testing-library/react'
import { WrapperProviderComp, allNotes } from "../../test.utils"



// eslint-disable-next-line @next/next/no-img-element
jest.mock('next/image', () => ({ src = "", alt }) => <img src={src} alt={alt} />)
jest.mock('next/router', ()=> ({push: jest.fn()}))


describe('<CreateNoteForm/>', () => {
 
    it('should call the dispatch fn',async () => {
        const mockDispatch = jest.fn()
        const mockState = { currentURL: '/create', savedNotes: allNotes }

        const { baseElement } = render(
          WrapperProviderComp(
            mockDispatch,
            mockState
          )(<CreateNoteForm transitionStyles={transitionStyles} />)
        )
    
        const subjectInput = baseElement.querySelector(`input[name="subject"]`)
        fireEvent.change(subjectInput, { target: { value: "TEST SUBJECT" } })
        fireEvent.submit(subjectInput)

        const keywordsInput = baseElement.querySelector(`input[name="currentKeyword"]`)
        fireEvent.change(keywordsInput, { target: { value: "TEST KEYWORD"}})
        fireEvent.submit(keywordsInput)

        const contentInput = baseElement.querySelector(`textarea[name="content"]`)
        fireEvent.change(contentInput, { target: { value: "TEST CONTENT"}})
        fireEvent.submit(contentInput)

        const button = screen.getByRole("button")
        fireEvent.click(button)

        expect(baseElement).toMatchSnapshot()
        expect(mockDispatch).toHaveBeenCalled()
   
      })

})