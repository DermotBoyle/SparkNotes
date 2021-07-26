import { SaveButton } from 'components/save-button'
import { useEffect, useState, useReducer } from 'react'

import styles from 'styles/create-note-form.module.scss'

import moment from 'moment'

export const CreateNoteForm = ({ transitionStyles, defaultStyle }) => {
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
          alert('Your note has been saved)')
          setFormValues(initialFormValues)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const [transitionState, setTransitionState] = useState('exiting')

  useEffect(() => {
    setTimeout(() => setTransitionState('entering'), 300),
      () => setTransitionState('exiting')
  }, [])

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
