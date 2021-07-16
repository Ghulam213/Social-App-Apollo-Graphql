import { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import { useForm } from '../hooks/useForm'

import { REGISTER_USER } from '../graphql'

const Register = (props) => {
  const context = useContext(AuthContext)
  const [errors, setError] = useState(null)

  const { onChange, onSubmit, values } = useForm(
    {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    registerCallback
  )

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, { data: { register: userData } }) => {
      context.login(userData)
      props.history.push('/')
    },
    onError: (error) => {
      setError(error.graphQLErrors[0].extensions.exception.errors)
    },
  })

  function registerCallback() {
    setError(null)
    registerUser({
      variables: {
        input: values,
      },
    })
  }

  return (
    <div className='form-card'>
      <h1 className='page-title'>Register</h1>
      {errors && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        </div>
      )}
      <Form noValidate onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          value={values.username}
          onChange={onChange}
          error={errors && errors.username}
        />
        <Form.Input
          type='email'
          label='Email'
          placeholder='Email'
          name='email'
          value={values.email}
          onChange={onChange}
          error={errors && errors.email}
        />
        <Form.Input
          type='password'
          label='Password'
          placeholder='Password'
          name='password'
          value={values.password}
          onChange={onChange}
          error={errors && errors.password}
        />
        <Form.Input
          type='password'
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={onChange}
          error={errors && errors.confirmPassword}
        />
        <Button type='submit' primary>
          Register
        </Button>
      </Form>
    </div>
  )
}

export default Register
