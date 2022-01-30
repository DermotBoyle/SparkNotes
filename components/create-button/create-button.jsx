import React from 'react'
import Image from 'next/image'
import styles from 'styles/control-container.module.scss'
// import dynamic from 'next/dynamic'
import { Routes } from 'utils'
import add from 'public/add.svg'
import Link from 'next/link'

// const ReactTooltip = dynamic(() => import('react-tooltip'), {
//   ssr: false
// })

export const CreateButton = ({ currentURL }) => {
  const isEditMode = () =>
    currentURL === Routes.CREATE || currentURL === Routes.EDIT

  return (
    <>
      {!isEditMode() && (
        <>
          <Link href={`${Routes.BASE}${Routes.CREATE}`} passHref>
            <button
              className={styles['create-button']}
              aria-label='create new note'
              data-tip
              data-for='create-button'
            >
              <Image src={add} alt='plus symbol' width={72} height={16}></Image>
            </button>
          </Link>
        </>
      )}
    </>
  )
}
