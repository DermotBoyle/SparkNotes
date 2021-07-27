import React from 'react'
import styles from 'styles/control-container.module.scss'
import { transitionManager } from 'utils'

export const ControlMenu = ({ currentURL }) => {
  return (
    <>
      {!!currentURL && (
        <div className={styles['main-view']}>
          {transitionManager('entered')({ currentURL })}
        </div>
      )}
    </>
  )
}
