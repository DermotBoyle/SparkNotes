import React from 'react'
import { useEffect, useState } from 'react'

import style from 'styles/solution.module.scss'

export const About = ({ transitionStyles, defaultStyle, transitionState }) => {
  const [on, setOn] = useState('entering')

  useEffect(() => {
    setOn(transitionState)
  }, [])

  const payload = {
    id: '123abc',
    date: 'datetime',
    content: 'some content here'
  }

  const userPayload = {
    id: '123abc',
    user: 'user',
    sharedWithUser: 'otherUser',
    content: {
      subject: 'subject',
      content: 'content',
      keywords: 'keywords'
    }
  }

  return (
    <section
      className={style.solution}
      style={{
        ...defaultStyle,
        ...transitionStyles[on]
      }}
    >
      <h3> --About the solution -- </h3>
      <p>
        This application is build with NextJS and mongoDB, I thought it was the
        best option based on the business requirements of creating a basic CRUD
        API and frontend. With nextJS I could take adavantage of the serverless
        functionalities and not have to worry about spinning up an express app.
        I went with mongoDB as its suitable for the app, as no complex entity
        relationships were needed to be formed and it also served the CRUD
        functionality well. Styling was taken care of with SASS and some simple
        page transition animations are cared for by the natural React lifecycle
        (mounting/unmounting) and aided by useEffect and useState.
      </p>

      <h5>Question 1 - what would be a good payload response</h5>
      <p>
        The payload response given for a single note looks fine to me. Outside
        of the id, data and necessary content nothing else is really needed.
      </p>
      <br />
      <pre>{JSON.stringify(payload, null, 2)}</pre>
      <br />
      <p>
        As the app became more complex info such as, hasBeenUpdated or by whom
        was it created/updated by would be a useful addition. So the only
        difference apart from having the response returned in an array for
        multiple notes could be to have it keyed by date or category/subject for
        quicker sorting/filtering
      </p>

      <h5>Question 2 - what function to add</h5>
      <p>I can think of a few that would be nice to see :</p>
      <ul>
        <li>
          <pre>
            Method: GET
            <br />
            Function: Find a note/s by subject, keyword or date
            <br />
            Payload: Would be same as above - or some appropriate not found
            handling
          </pre>
        </li>
        <li>
          <pre>
            Method: PUT/PATCH/POST
            <br />
            Function: Assign a deadline
            <br />
            Payload: depending on if it is a new note or an update, again same
            as above but with updated deadline field. My implementation uses an
            updated field.
          </pre>
        </li>
        <li>
          <pre>
            Method: POST
            <br />
            Function: Recieve notes sorted by some function
            <br />
            Payload: providing the backend with some conditions return a sorted
            list, same structe as the others
          </pre>
        </li>
        <li>
          <pre>
            Method: POST
            <br />
            Function: share note with other user
            <br />
            Payload: providing the backend with other user ID, notify user of
            shared note.
            <br />
            {JSON.stringify(userPayload, null, 2)}
          </pre>
        </li>
      </ul>
    </section>
  )
}
