import { createContext, useReducer, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
})

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state
    case 'LOGIN':
      return {
        ...state,
        user: action.userData,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
  }
}

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { user: null })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp * 1000 <= Date.now()) {
        logout()
      } else {
        login({
          id: decodedToken.id,
          username: decodedToken.username,
          email: decodedToken.email,
          token,
        })
      }
    }
  }, [])

  const login = (userData) => {
    localStorage.setItem('token', userData.token)
    dispatch({
      type: 'LOGIN',
      userData,
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }
