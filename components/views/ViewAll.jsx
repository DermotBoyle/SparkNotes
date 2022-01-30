import React, { useEffect, useState } from 'react'
import { NotePicker } from 'components/note-picker'
//import { fetcher } from 'utils'
//import useSWR from 'swr'
import style from 'styles/view-all.module.scss'



import { useAppContext } from 'context/global-state'


export const ViewAll = ({
  transitionStyles,
  defaultStyle,
  transitionState
}) => {
  //const { data } = useSWR('/api/note/', fetcher)
  const {state:{savedNotes}} =  useAppContext()

  const [isLoading, setIsLoading] = useState(true)

  const [on, setOn] = useState('entering')

  useEffect(() => {
    setOn(transitionState)
  }, [])

  useEffect(() => {
    if (savedNotes) {
      setIsLoading(false)
    }
  }, [savedNotes])

  return (
    <section
      className={style['view-all']}
      style={{
        ...defaultStyle,
        ...transitionStyles[on]
      }}
    >
      <p>All Notes</p>
      <NotePicker allNotes={savedNotes} isLoading={isLoading} />
    </section>
  )
}
