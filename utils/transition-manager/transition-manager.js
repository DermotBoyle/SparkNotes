import {
  Home,
  ViewAll,
  About,
  Find,
  CreateNoteForm,
  EditNoteForm
} from 'components/views'
import { Routes } from 'utils'

export const transitionManager = transitionState => ({
  [Routes.HOME]: (
    <Home
      transitionState={transitionState}
      defaultStyle={defaultStyle}
      transitionStyles={transitionStyles}
    />
  ),
  [Routes.VIEW_ALL]: (
    <ViewAll
      transitionState={transitionState}
      defaultStyle={defaultStyle}
      transitionStyles={transitionStyles}
    />
  ),
  [Routes.FIND]: (
    <Find
      transitionState={transitionState}
      defaultStyle={defaultStyle}
      transitionStyles={transitionStyles}
    />
  ),
  [Routes.ABOUT]: (
    <About
      transitionState={transitionState}
      defaultStyle={defaultStyle}
      transitionStyles={transitionStyles}
    />
  ),
  [Routes.CREATE]: (
    <CreateNoteForm
      transitionState={transitionState}
      defaultStyle={defaultStyle}
      transitionStyles={transitionStyles}
    />
  ),
  [Routes.EDIT]: (
    <EditNoteForm
      transitionState={transitionState}
      defaultStyle={defaultStyle}
      transitionStyles={transitionStyles}
    />
  )
})

const defaultStyle = {
  transition: `opacity 800ms ease-out`,
  opacity: 0
}

const transitionStyles = {
  entered: { opacity: 1 },
  exiting: { opacity: 0 }
}
