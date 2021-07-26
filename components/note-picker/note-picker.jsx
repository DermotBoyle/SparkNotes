import Head from 'next/head'
import Image from 'next/image'
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
  pageDots: false
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

  const deleteNote = _id => {
    fetch('/api/note/' + _id, {
      method: 'DELETE'
    }).then(res => {
      console.log(res)
      res.status === 201 && router.reload()
    })
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
        {!!allNotes ? (
          <Flickity
            initialIndex={1}
            className={'carousel'}
            options={flickityOptions}
            static
          >
            {allNotes.data.map(({ subject, content, _id, keywords = [] }) => (
              <div key={_id} className={styles.item}>
                <Image
                  src={edit}
                  width={15}
                  onClick={() => goToEdit({ subject, content, _id, keywords })}
                />
                <h5>{subject}</h5>
                <p style={{ fontFamily: 'Satisfy' }}>{content}</p>
                <button onClick={() => deleteNote({ _id })}>DELETE</button>
              </div>
            ))}
          </Flickity>
        ) : (
          <h3>No notes to show</h3>
        )}
      </div>
    </>
  )
}
