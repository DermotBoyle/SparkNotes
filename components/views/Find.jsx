import React from 'react'
import { useEffect, useState } from 'react'

import style from 'styles/find.module.scss'

export const Find = ({ transitionStyles, defaultStyle, transitionState }) => {
  const [on, setOn] = useState('entering')

  useEffect(() => {
    setOn(transitionState)
  }, [])

  return (
    <section
      className={style.find}
      style={{
        ...defaultStyle,
        ...transitionStyles[on]
      }}
    >
      <p>Find Section Here</p>
      <h3>...in progress</h3>
    </section>
  )
}
