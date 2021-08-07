import React from 'react'
import { useEffect, useState } from 'react'
import { Methods } from 'utils'

import style from 'styles/find.module.scss'

export const Find = ({ transitionStyles, defaultStyle, transitionState }) => {
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
            console.log('====================================')
            console.log(data)
            console.log('====================================')
            setFetchResults(data)
          })
      } catch (error) {
        alert(error)
      }
    }
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
    </section>
  )
}
