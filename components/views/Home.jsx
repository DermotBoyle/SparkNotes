import { useEffect, useState } from 'react'

export const Home = ({ transitionStyles, defaultStyle }) => {
  const [transitionState, setTransitionState] = useState('exiting')

  useEffect(() => {
    const timer = setTimeout(() => setTransitionState('entering'), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      style={{
        ...defaultStyle,
        ...transitionStyles[transitionState]
      }}
    >
      <h3>Welcome to the note App !</h3>
      <p>Please select an action from the menu</p>
    </section>
  )
}
