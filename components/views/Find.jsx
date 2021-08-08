import React from 'react'
import { useEffect, useState } from 'react'
import { Methods } from 'utils'
import { useRouter } from 'next/router'
import moment from 'moment'

import { Routes } from 'utils'

import style from 'styles/find.module.scss'

export const Find = ({ transitionStyles, defaultStyle, transitionState }) => {
  const router = useRouter()
  const [on, setOn] = useState('entering')
  const [fetchResults, setFetchResults] = useState([])

  useEffect(() => {
    setOn(transitionState)
  }, [])

  const handleChange = ({ target: { value } }) => {
    if (value.length >= 2) {
      try {
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
      }
    }
  }

  const goToNote = id => {
    router.push(Routes.BASE + Routes.VIEW_ALL + `&id=${id}`)
  }
  return (
    <section
      className={style.find}
      style={{
        ...defaultStyle,
        ...transitionStyles[on]
      }}
    >
      <p>Find by keyword</p>
      <input
        type='text'
        placeholder='Search for a keyword...'
        onChange={handleChange}
      />
      <ul>
        {!!fetchResults
          ? fetchResults.map(({ subject, updated, _id }) => (
              <li key={_id} onClick={() => goToNote(_id)}>
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
