import { SaveButton } from 'components/save-button'
import { useReducer } from 'react'

import styles from 'styles/create-note-form.module.scss'

import { useAppContext } from 'context/global-state'
import Router from 'next/router'
import { Routes, Methods } from 'utils'

import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

export const EditNoteForm = () => {
  const {
    state: {
      subject: initialSubject,
      keywords: initialKeywords,
      content: initialContent,
      _id
    },
    dispatch
  } = useAppContext()

  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    {
      content: initialContent,
      keywords: initialKeywords,
      subject: initialSubject,
      currentKeyword,
      _id
    }
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

  const handleRemoveKeyword = value => {
    const updatedKeywords = formValues.keywords.filter(word => word !== value)
    setFormValues({ keywords: updatedKeywords })
  }

  /* const updateDB = async formValues => {
    try {
      await fetch(`api/note/${formValues._id}`, {
        method: Methods.PUT,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      }).then(res => {
        if (res.status === 201) Router.push(Routes.BASE + Routes.VIEW_ALL)
      })
    } catch (error) {
      alert(error)
    }
  }*/

  const updateDB = ( formValues ) => {
    dispatch({
      type: 'updateAtId',
      payload: {currentNote: formValues}
    })
    Router.push(Routes.BASE + Routes.VIEW_ALL)
  }

  return (
    <section
      className={styles['form-container']}
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
              {!!formValues?.keywords?.length
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
