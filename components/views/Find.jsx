import React from 'react'
import { useEffect, useState } from 'react'

export const Find = ({ transitionStyles, defaultStyle, transitionState }) => {
  const [on, setOn] = useState('entering')

  useEffect(() => {
    setOn(transitionState)
  })
  return (
    <section
      style={{
        ...defaultStyle,
        ...transitionStyles[on]
      }}
    >
      <p>Find Section Here</p>
    </section>
  )
}
