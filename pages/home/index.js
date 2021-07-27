import React from 'react'
import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ControlContainer, SideMenu, ControlMenu } from 'components'
import { useAppContext } from 'context/global-state'
import vercel from 'public/vercel.svg'

import styles from 'styles/main-component.module.scss'

export default function MainComponent () {
  const {
    state: { currentURL },
    dispatch
  } = useAppContext()
  const { query } = useRouter()

  useEffect(() => {
    query &&
      dispatch({
        type: query.section === '/' ? 'reset' : 'update',
        payload: { currentURL: query.section }
      })
  }, [query])

  return (
    <div className={styles.container} data-testid='side-menu'>
      <Head>
        <title>Spark Notes</title>
        <meta name='Code test for Sparks' />
      </Head>

      <ControlContainer currentURL={currentURL}>
        <ControlMenu currentURL={currentURL} />
        <SideMenu currentURL={currentURL} />
      </ControlContainer>

      <footer className={styles.footer}>
        <a
          href='https://github.com/dermotboyle'
          target='_blank'
          rel='noopener noreferrer'
        >
          Designed and Developed by Dermot Paul Boyle
        </a>
        <div className={styles.deployment}>
          <p>Deployed on </p>
          <Image src={vercel} alt='Vercel Logo' width={72} height={16} />
        </div>
      </footer>
    </div>
  )
}
