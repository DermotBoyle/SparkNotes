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

export const transitionManager = () => {
  const View = {
    [Routes.HOME]: (
      <Home/>
    ),
    [Routes.VIEW_ALL]: (
      <ViewAll />
    ),
    [Routes.FIND]: (
      <Find/>
    ),
    [Routes.ABOUT]: (
      <About/>
    ),
    [Routes.CREATE]: (
      <CreateNoteForm/>
    ),
    [Routes.EDIT]: (
      <EditNoteForm/>
    )
  }

  return function ComponentToRender ({ currentURL }) {
    return View[currentURL]
  }
}

