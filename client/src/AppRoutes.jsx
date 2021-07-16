import { useContext } from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'

import { AuthContext } from './context/auth'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddPost from './pages/AddPost'
import Post from './pages/Post'
import Navbar from './components/Navbar'

import { Container } from 'semantic-ui-react'

const AppRoutes = () => {
  const { user } = useContext(AuthContext)
  var routes = (
    <>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/post/:postId' component={Post} />
      <Redirect from='*' to='/' />
    </>
  )

  if (user) {
    routes = (
      <>
        <Route exact path='/' component={Home} />
        <Route exact path='/addPost' component={AddPost} />
        <Route exact path='/post/:postId' component={Post} />
        <Redirect from='*' to='/' />
      </>
    )
  }
  return (
    <BrowserRouter>
      <Container>
        <Navbar />
        {routes}
      </Container>
    </BrowserRouter>
  )
}

export default AppRoutes
