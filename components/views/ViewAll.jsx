import React, { useEffect, useState } from 'react'
import { NotePicker } from 'components/note-picker'
import { fetcher } from 'utils'

import style from 'styles/view-all.module.scss'

import useSWR from 'swr'

export const ViewAll = ({
  transitionStyles,
  defaultStyle,
  transitionState
}) => {
  const { data } = useSWR('/api/note/', fetcher)

  const [isLoading, setIsLoading] = useState(true)

  const [on, setOn] = useState('entering')

  useEffect(() => {
    setOn(transitionState)
  }, [])

  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data])

  return (
    <section
      className={style['view-all']}
      style={{
        ...defaultStyle,
        ...transitionStyles[on]
      }}
    >
      <p>All Notes</p>
      <NotePicker allNotes={data} isLoading={isLoading} />
    </section>
  )
}
