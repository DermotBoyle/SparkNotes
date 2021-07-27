import { SaveButton } from 'components/save-button'
import { useReducer } from 'react'
import router from 'next/router'

import styles from 'styles/create-note-form.module.scss'

import moment from 'moment'

import { Routes } from 'utils'

export const CreateNoteForm = ({
  transitionStyles,
  defaultStyle,
  transitionState
}) => {
  const initialFormValues = {
    subject: '',
    keywords: '',
    content: '',
    date: ''
  }

  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    initialFormValues
  )

  const { subject, keywords, content } = formValues

  const handleFormChange = ({ target }) => {
    const { name, value } = target
    setFormValues({ [name]: value })
  }

  const handleSaveClick = async () => {
    formValues.date = moment(new Date()).format('YYYY-MM-DD-T00:00:00.000Z')
    updateDB(formValues)
  }

  const updateDB = async formValues => {
    try {
      await fetch('api/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      }).then(({ statusText }) => {
        if (statusText === 'Created') {
          setFormValues(initialFormValues)
          if (res.status === 201) router.push(Routes.BASE + Routes.VIEW_ALL)
        }
      })
    } catch (error) {
      console.error(error)
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
              value={subject}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label>Keywords</label>
            <input
              type='text'
              name='keywords'
              value={keywords}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className={styles['main-note']}>
          <label>Write your note here</label>
          <textarea
            type='text'
            name='content'
            value={content}
            onChange={handleFormChange}
          />
        </div>
      </form>
      <SaveButton formValues={formValues} handleSaveClick={handleSaveClick} />
    </section>
  )
}
