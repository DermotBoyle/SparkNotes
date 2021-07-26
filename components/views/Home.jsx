import { useEffect, useState } from 'react'
import style from 'styles/home.module.scss'

export const Home = ({ transitionStyles, defaultStyle, transitionState }) => {
  console.log(transitionState)

  const [on, setOn] = useState('entering')

  useEffect(() => {
    setOn(transitionState)
  })

  return (
    <section
      className={style.home}
      style={{
        ...defaultStyle,
        ...transitionStyles[on]
      }}
    >
      <h3>Welcome to the note App !</h3>
      <p>Please select an action from the menu</p>
    </section>
  )
}
