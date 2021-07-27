import React from 'react'
import { useEffect, useState } from 'react'
import { NotePicker } from 'components/note-picker'
import { fetcher } from 'utils'

import style from 'styles/view-all.module.scss'

import useSWR from 'swr'

export const ViewAll = ({
  transitionStyles,
  defaultStyle,
  transitionState
}) => {
  const { data: data } = useSWR('/api/note/', fetcher)

  const [on, setOn] = useState('entering')

  useEffect(() => {
    setOn(transitionState)
  }, [])

  return (
    <section
      className={style['view-all']}
      style={{
        ...defaultStyle,
        ...transitionStyles[on]
      }}
    >
      <p>All Notes</p>
      <NotePicker allNotes={data} />
    </section>
  )
}
