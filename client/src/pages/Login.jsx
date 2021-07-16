import { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import { useForm } from '../hooks/useForm'

import { LOGIN_USER } from '../graphql'

const Login = (props) => {
  const context = useContext(AuthContext)
  const [errors, setError] = useState(null)

  const { onChange, onSubmit, values } = useForm(
    {
      username: '',
      password: '',
    },
    loginCallback
  )

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update: (_, { data: { login: userData } }) => {
      context.login(userData)
      props.history.push('/')
    },
    onError: (error) => {
      setError(error.graphQLErrors[0].extensions.exception.errors)
    },
  })

  function loginCallback() {
    setError(null)
    loginUser({
      variables: {
        input: values,
      },
    })
  }

  return (
    <div className='form-card'>
      <h1 className='page-title'>Login</h1>
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
          type='password'
          label='Password'
          placeholder='Password'
          name='password'
          value={values.password}
          onChange={onChange}
          error={errors && errors.password}
        />
        <Button type='submit' primary>
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login
