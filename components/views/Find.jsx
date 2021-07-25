import { useEffect, useState } from 'react'

export const Find = ({ transitionStyles, defaultStyle }) => {
  const [transitionState, setTransitionState] = useState('exiting')

  useEffect(() => {
    setTimeout(() => setTransitionState('entering'), 300),
      () => setTransitionState('exiting')
  }, [])

  return (
    <section
      style={{
        ...defaultStyle,
        ...transitionStyles[transitionState]
      }}
    >
      <p>Find Section Here</p>
    </section>
  )
}
