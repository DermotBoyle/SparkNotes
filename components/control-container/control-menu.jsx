import { useEffect, useState } from 'react'
import styles from 'styles/control-container.module.scss'
import { Transition } from 'react-transition-group'
import { transitionManager } from 'utils'

export const ControlMenu = ({ currentURL }) => {
  const [on, setOn] = useState(false)

  useEffect(() => {
    setOn(true)
    return () => setOn(false)
  }, [currentURL])

  return (
    <>
      {!!currentURL && (
        <div className={styles['main-view']}>
          <Transition in={on} timeout={8000}>
            {state => transitionManager(state)[currentURL]}
          </Transition>
        </div>
      )}
    </>
  )
}
