import React, { useContext, useState } from 'react'
import StyledNavbar from './styles'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { useScrollTop } from '../../utils'
import  SearchBar from '../widgets/SearchBar/index'
import { useFetch } from '../../utils'
import _ from 'lodash'
import UserContext from "../../UserContext";

const Header = props => {
  const {user, setUser} = useContext(UserContext)
  console.log('user!', user)
  let scrollTop = useScrollTop()
  let Logo = document.getElementById("logo");
  let endOfDocumentTop = 60
  if(Logo) {
  Logo.className = 'smallLogo'  //scrollTop > endOfDocumentTop ? 'smallLogo' :  'largeLogo'
  }

  return (
  <StyledNavbar>
        <header className="header">
              <a>
                <Link to={{pathname:'/'}}>
                  <img id="logo" alt="logo" src="assets/icons/logo.png" width="330"/>
                </Link>
              </a>
              <input className="menu-btn" type="checkbox" id="menu-btn" />
              <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
              <ul className="menu">
                  <li><SearchBar /></li>
                  <li>
                        <a href="/about">ABOUT</a>
                  </li>
                  {/* <li><a>ARCHIVES</a></li> */}
                  <li>
                    {user ? <Button>{user}</Button>
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