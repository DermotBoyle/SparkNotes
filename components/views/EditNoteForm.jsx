import { SaveButton } from 'components/save-button'
import { useEffect, useState, useReducer } from 'react'

import styles from 'styles/create-note-form.module.scss'

import moment from 'moment'
import { useAppContext } from 'context/global-state'
import router from 'next/router'
import { Routes, Methods } from 'utils'

export const EditNoteForm = ({
  transitionStyles,
  defaultStyle,
  transitionState
}) => {
  const {
    state: { subject, keywords, content, _id }
  } = useAppContext()

  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    {
      subject,
      keywords,
      content,
      _id
    }
  )

  const handleFormChange = ({ target }) => {
    const { name, value } = target
    setFormValues({ [name]: value })
  }

  const handleSaveClick = async () => {
    formValues.updated = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]')
    updateDB(formValues)
  }

  const updateDB = async formValues => {
    try {
      await fetch(`api/note/${formValues._id}`, {
        method: Methods.PUT,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      }).then(res => {
        if (res.status === 201) router.push(Routes.BASE + Routes.VIEW_ALL)
      })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <section
      className={styles['form-container']}
      style={{
        ...defaultStyle,
        ...transitionStyles[transitionState]
      }}
    >
      <form>
        <div className={styles['keywords-container']}>
          <div>
            <label>Subject</label>
            <input
              type='text'
              name='subject'
              value={formValues.subject}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label>Keywords</label>
            <input
              type='text'
              name='keywords'
              value={formValues.keywords}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className={styles['main-note']}>
          <label>Write your note here</label>
          <textarea
            type='text'
            name='content'
            value={formValues.content}
            onChange={handleFormChange}
          />
        </div>
      </form>
      <SaveButton handleSaveClick={handleSaveClick} formValues={formValues} />
    </section>
  )
}
