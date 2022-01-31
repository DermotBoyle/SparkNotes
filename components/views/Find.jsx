import React, {useRef} from 'react'
import { useState } from 'react'
import { Methods } from 'utils'
import { useRouter } from 'next/router'
import moment from 'moment'
import Image from 'next/image'

import { Routes } from 'utils'
import { useAppContext } from 'context/global-state'
import style from 'styles/find.module.scss'
import { useAnimation } from './useAnimation'

export const Find = () => {
  const router = useRouter()
  const { state } = useAppContext()
  const [fetchResults, setFetchResults] = useState([])
  const containerRef = useRef(null)

  const handleChange = ({ target: { value } }) => {
    if (value.length >= 2) {
     /* try {
        fetch(`api/note/keyword/${value}`, {
          method: Methods.GET,
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(({ data }) => {
            setFetchResults(data)
          })
      } catch (error) {
        alert(error)
      }*/
      const matches = state.savedNotes.filter((note) => note.keywords.indexOf(value) !== -1 && note)
      setFetchResults(matches)
    }
  }

  const goToNote = id => {
    router.push(Routes.BASE + Routes.VIEW_ALL + `&id=${id}`)
  }


  return (
    <section
      className={style.find}
      ref={containerRef}
    >
      <label>Find by keyword</label>
      <span className={style['input-container']} data-testid="find-component">
        <input
          type='search'
          placeholder='Search for a keyword...'
          onChange={handleChange}
        />
        <button name='' role="button">
          <Image
            alt='search icon'
            height={18}
            width={18}
            src='/loupe.png'
          ></Image>
        </button>
      </span>
      <ul>
        {!!fetchResults.length
          ? fetchResults.map(({ subject, updated, _id }) => (
              <li key={_id} onClick={() => goToNote(_id)} data-testid="list-item">
                {
                  <p>{`Note: ${subject} - ${moment
                    .utc(updated)
                    .format('dddd, MMMM Do, YYYY h:mm:ss A')}`}</p>
                }
              </li>
            ))
          : null}
      </ul>
    </section>
  )
}
