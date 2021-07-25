import { useEffect, useState } from 'react'
import { NotePicker } from 'components/note-picker'
import { fetcher } from 'utils'

import style from 'styles/view-all.module.scss'

import useSWR from 'swr'

export const ViewAll = ({ transitionStyles, defaultStyle }) => {
  const [transitionState, setTransitionState] = useState('exiting')

  const { data: data } = useSWR('/api/note/', fetcher)

  useEffect(() => {
    setTimeout(() => setTransitionState('entering'), 300)
  }, [])

  return (
    <section
      className={style['view-all']}
      style={{
        ...defaultStyle,
        ...transitionStyles[transitionState]
      }}
    >
      <p>All Notes</p>
      <NotePicker allNotes={data} />
    </section>
  )
}
