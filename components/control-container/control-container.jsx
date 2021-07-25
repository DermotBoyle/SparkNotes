import styles from 'styles/control-container.module.scss'
import { CreateButton } from 'components/create-button'

export const ControlContainer = ({ children, currentURL }) => {
  return (
    <main className={styles['control-container']}>
      {children}
      <CreateButton currentURL={currentURL} />
    </main>
  )
}
