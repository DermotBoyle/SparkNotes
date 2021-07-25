import styles from 'styles/control-container.module.scss'
import { Transition } from 'react-transition-group'
import { transitionManager } from 'utils'

export const ControlMenu = ({ currentURL }) => {
  return (
    <>
      {!!currentURL && (
        <div className={styles['main-view']}>
          <Transition in={!!transitionManager[currentURL]} timeout={800}>
            {state => transitionManager(state)[currentURL]}
          </Transition>
        </div>
      )}
    </>
  )
}
