import { SaveButton } from 'components/save-button'
import { useReducer } from 'react'
import Router from 'next/router'
import { useAppContext } from 'context/global-state'

import styles from 'styles/create-note-form.module.scss'

import moment from 'moment'

import { Routes } from 'utils'
import { v4 as uuidv4 } from 'uuid'

export const CreateNoteForm = ({
  transitionStyles,
  defaultStyle,
  transitionState
}) => {
  const initialFormValues = {
    subject: '',
    keywords: [],
    content: '',
    date: '',
    currentKeyword: ''
  }

  const { dispatch } = useAppContext()

  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    initialFormValues
  )

  const { subject, keywords, content, currentKeyword } = formValues

  const handleFormChange = ({ target }) => {
    const { name, value } = target
    setFormValues({ [name]: value })
  }

  const formatKeywords = ({ keyCode, target: { value } }) => {
    if (keyCode === 32 || keyCode === 13) {
      setFormValues({ keywords: [...keywords, value], currentKeyword: '' })
    }
  }

  const handleSaveClick = async () => {
    formValues.date = moment.utc().format()
    updateDB(formValues)
  }

  const handleRemoveKeyword = (value) => {
    const updatedKeywords = formValues.keywords.filter(word => word !== value)
    setFormValues({ keywords: updatedKeywords })
  }

  const addUniqueId = (formValues) => {
    formValues._id = uuidv4()
    return formValues
  }


  /*const updateDB = async formValues => {
    try {
      await fetch('api/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      }).then(res => {
        if (res.status === 201) {
          setFormValues(initialFormValues)
          Router.push(Routes.BASE + Routes.VIEW_ALL)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }*/

  const updateDB = (formValues) => {

    const newNote = addUniqueId(formValues)

    dispatch({
      type: 'save',
      payload: { newNote }
    })
    Router.push(Routes.BASE + Routes.VIEW_ALL)
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
        <div className={styles['inputs-container']}>
          <div className={styles['subject-input']}>
            <label>Subject</label>
            <input
              type='text'
              name='subject'
              value={subject}
              onChange={handleFormChange}
            />
          </div>
          <div className={styles['keywords-input']}>
            <label>Keywords</label>
            <p className={styles['keywords-saved']}>{keywords?.length}/ 5</p>
            <input
              disabled={keywords?.length === 5}
              type='text'
              name='currentKeyword'
              value={currentKeyword}
              onChange={handleFormChange}
              onKeyDown={formatKeywords}
            />
            <div className={styles['keyword-chips-container']}>
              {!!keywords?.length
                ? keywords?.map(word => (
                    <p onClick={() => handleRemoveKeyword(word)} key={uuidv4()}>
                      {word} X
                    </p>
                  ))
                : null}
            </div>
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
