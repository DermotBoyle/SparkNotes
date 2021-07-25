import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from 'context/global-state'
import edit from 'public/edit-icon.svg'
import { useRouter } from 'next/router'

import { Routes } from 'utils'

const Flickity =
  typeof window !== 'undefined'
    ? require('react-flickity-component')
    : () => null

import styles from 'styles/carousel-container.module.scss'

const flickityOptions = {
  initialIndex: 1.5
}

export const NotePicker = ({ allNotes }) => {
  const { dispatch } = useAppContext()
  const router = useRouter()

  const goToEdit = note => {
    dispatch({
      type: 'update',
      payload: { currentNote: note, currentURL: 'edit-mode' }
    })
    router.push(`${Routes.BASE}${Routes.EDIT}`)
  }

  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&family=Satisfy&display=swap'
          rel='stylesheet'
        />
      </Head>
      <div className={styles.carousel}>
        {!!allNotes && (
          <Flickity
            initialIndex={1}
            className={'carousel'}
            options={flickityOptions}
            static
          >
            {allNotes.data.map(({ subject, content, _id }) => (
              <div key={_id} className={styles.item}>
                <Image
                  src={edit}
                  width={15}
                  onClick={() => goToEdit({ subject, content, _id })}
                />
                <h5>{subject}</h5>
                <p style={{ fontFamily: 'Satisfy' }}>{content}</p>
              </div>
            ))}
          </Flickity>
        )}
      </div>
    </>
  )
}
