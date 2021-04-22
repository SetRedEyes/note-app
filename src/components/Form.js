import React, { useState, useContext } from 'react'
import { AlertContext } from '../context/alert/alertContext'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export const Form = () => {
  const [value, setValue] = useState('')
  const alert = useContext(AlertContext)
  const firebase = useContext(FirebaseContext)

  const submitHandler = (event) => {
    event.preventDefault()

    if (value.trim()) {
      firebase
        .addNote(value.trim())
        .then(() => {
          alert.show('Note was created', 'success')
        })
        .catch(() => {
          alert.show('Something went wrong', 'danger')
        })
      setValue('')
    } else {
      alert.show('Please type the note title')
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <div className='form-gropup'>
        <input
          type='text'
          className='form-control'
          placeholder='Enter note title'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  )
}
