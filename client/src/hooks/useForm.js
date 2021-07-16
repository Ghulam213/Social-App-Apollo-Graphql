import { useState } from 'react'

export const useForm = (initialState = {}, callback) => {
  const [values, setValues] = useState(initialState)

  const onSubmit = (e) => {
    e.preventDefault()
    callback()
  }

  const onChange = (e) => {
    const newValues = {
      ...values,
      [e.target.name]: e.target.value,
    }
    setValues(newValues)
  }

  return {
    onChange,
    onSubmit,
    values,
  }
}
