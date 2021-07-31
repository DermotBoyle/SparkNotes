import Image from 'next/image'
// import dynamic from 'next/dynamic'
import styles from 'styles/control-container.module.scss'

import save from 'public/add.svg'

// const ReactTooltip = dynamic(() => import('react-tooltip'), {
//   ssr: false
// })

export const SaveButton = ({ handleSaveClick, formValues }) => {
  return (
    <>
      <button
        className={styles['save-button']}
        aria-label='save new note'
        data-tip
        data-for='save-button'
        onClick={handleSaveClick}
        disabled={!formValues?.subject && !formValues?.content}
      >
        <Image src={save} alt='tick symbol' width={72} height={16}></Image>
      </button>
    </>
  )
}
