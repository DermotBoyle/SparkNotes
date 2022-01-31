import React, { useEffect, useState } from 'react'
import { NotePicker } from 'components/note-picker'
//import { fetcher } from 'utils'
//import useSWR from 'swr'
import style from 'styles/view-all.module.scss'

import { useAppContext } from 'context/global-state'

export const ViewAll = () => {
  //const { data } = useSWR('/api/note/', fetcher)
  const {state: { savedNotes}} =  useAppContext()

  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (!savedNotes.length) {
      setIsLoading(false)
    }
  }, [savedNotes])

  return (
    <section
      className={style['view-all']}>
      <p>All Notes</p>
      <NotePicker allNotes={savedNotes} isLoading={isLoading} />
    </section>
  )
}
