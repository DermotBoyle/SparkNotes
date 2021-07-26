import { useEffect, useState } from 'react'

export const About = ({ transitionStyles, defaultStyle, transitionState }) => {
  const [on, setOn] = useState('entering')

  useEffect(() => {
    setOn(transitionState)
  })
  return (
    <section
      style={{
        ...defaultStyle,
        ...transitionStyles[transitionState]
      }}
    >
      <p>This is an about App I built with NextJS and MongoDB</p>
    </section>
  )
}
