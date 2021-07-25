import { useEffect, useState } from 'react'

export const About = ({ transitionStyles, defaultStyle }) => {
  const [transitionState, setTransitionState] = useState('exiting')

  useEffect(() => {
    setTimeout(() => setTransitionState('entering'), 300)
  }, [])

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
