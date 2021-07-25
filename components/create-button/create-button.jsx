import Image from 'next/image'
import styles from 'styles/control-container.module.scss'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Routes } from 'utils'
import add from 'public/add.svg'
import Link from 'next/link'

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false
})

export const CreateButton = ({ currentURL }) => {
  const router = useRouter()

  const isEditMode = () => currentURL === Routes.CREATE

  return (
    <>
      {!isEditMode() && (
        <>
          <Link href={`${Routes.BASE}${Routes.CREATE}`}>
            <button
              className={styles['create-button']}
              aria-label='create new note'
              data-tip
              data-for='create-button'
            >
              <Image src={add} alt='plus symbol' width={72} height={16}></Image>
            </button>
          </Link>

          <ReactTooltip
            id='create-button'
            place='top'
            type='dark'
            effect='float'
          >
            <p>Create a note</p>
          </ReactTooltip>
        </>
      )}
    </>
  )
}
