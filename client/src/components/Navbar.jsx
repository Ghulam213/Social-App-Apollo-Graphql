import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'

const Navbar = () => {
  // pathname => / | /login | /register ...
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)

  const { user, logout } = useContext(AuthContext)

  const handleItemClick = (_, { name }) => {
    if (name === 'logout') {
      logout()
      setActiveItem('home')
    } else {
      setActiveItem(name)
    }
  }

  if (user) {
    return (
      <div>
        <Menu pointing secondary size='massive' color='teal'>
          <Menu.Item
            name={user.username}
            active
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
          <Menu.Item
            name='addPost'
            active={activeItem === 'addPost'}
            onClick={handleItemClick}
            as={Link}
            to='/addPost'
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              onClick={handleItemClick}
              as={Link}
              to='/'
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }

  return (
    <div>
      <Menu pointing secondary size='massive' color='teal'>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to='/'
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to='/login'
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to='/register'
          />
        </Menu.Menu>
      </Menu>
    </div>
  )
}

export default Navbar
