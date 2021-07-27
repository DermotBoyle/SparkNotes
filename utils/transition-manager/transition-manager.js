import React from 'react'
import {
  Home,
  ViewAll,
  About,
  Find,
  CreateNoteForm,
  EditNoteForm
} from 'components/views'
import { Routes } from 'utils'

export const transitionManager = transitionState => {
  const View = {
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
  }

  return function ComponentToRender ({ currentURL }) {
    return View[currentURL]
  }
}

export const defaultStyle = {
  transition: `opacity 800ms ease-out`,
  opacity: 0
}

export const transitionStyles = {
  entered: { opacity: 1 },
  exiting: { opacity: 0 }
}
