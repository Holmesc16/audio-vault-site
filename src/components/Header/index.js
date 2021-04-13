import React, { useContext, useState } from 'react'
import StyledNavbar from './styles'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import  SearchBar from '../widgets/SearchBar/index'
import _ from 'lodash'
import UserContext from "../../UserContext";

const Header = props => {
  const {user, setUser} = useContext(UserContext)

  return (
  <StyledNavbar>
        <header className="header">
              <a>
                {window.location.pathname === '/' ? 
                <img id="logo" className="smallLogo" 
                alt="logo" src="assets/icons/logo.png" width="330"
                onClick={() => window.scrollTo(0,0)}
                />
                : <Link to={{pathname:'/'}}>
                <img id="logo" className='smallLogo'
                 alt="logo" src="assets/icons/logo.png" width="330"/>
              </Link>
                }
              </a>
              <input className="menu-btn" type="checkbox" id="menu-btn" />
              <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
              <ul className="menu">
                  <li><SearchBar /></li>
                  <li>
                        <a href="/about" className="border">About</a>
                  </li>
                  <li>
                    {user ? <Button className="username">{user.username}</Button>
                  : <Link to={{pathname: '/login'}}>
                      <Button className="sign-in" primary>Sign In</Button>
                    </Link>
                  }</li>
              </ul>
          </header>
  </StyledNavbar>
    )
}

export default Header