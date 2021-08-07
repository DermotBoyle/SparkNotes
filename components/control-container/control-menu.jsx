import React, { useEffect } from 'react'
import styles from 'styles/control-container.module.scss'
import { transitionManager } from 'utils'
import ReactTooltip from 'react-tooltip'

export const ControlMenu = ({ currentURL }) => {
  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])

  return (
    <>
      {!!currentURL && (
        <div className={styles['main-view']}>
          {transitionManager('entered')({ currentURL })}
        </div>
      )}
      <ReactTooltip id='save-button' place='top' type='dark' effect='float'>
        Save the note
      </ReactTooltip>
      <ReactTooltip id='edit-button' place='top' type='dark' effect='float'>
        Edit a note
      </ReactTooltip>
      <ReactTooltip id='create-button' place='top' type='dark' effect='float'>
        Create a note
      </ReactTooltip>
    </>
  )
}
