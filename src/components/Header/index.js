import React, { useContext } from 'react'
import StyledNavbar from './styles'
import {Redirect} from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { useScrollTop } from '../../utils'
import  SearchBar from '../widgets/SearchBar/index'
import { useFetch } from '../../utils'
import _ from 'lodash'
import { AuthContext } from "../../App";

const Header = props => {
  // const { dispatch } = useContext(AuthContext)
  
  let scrollTop = useScrollTop()
  let Logo = document.getElementById("logo");
  let endOfDocumentTop = 60
  if(Logo) {
  Logo.className = 'smallLogo'  //scrollTop > endOfDocumentTop ? 'smallLogo' :  'largeLogo'
  }
  
  return (
  <StyledNavbar>
        <header className="header">
              <a onClick={() => <Redirect to="/"/>}><img id="logo" alt="logo" src="assets/icons/logo.png" width="330"/></a>
              <input className="menu-btn" type="checkbox" id="menu-btn" />
              <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
              <ul className="menu">
                  <li><SearchBar /></li>
                  <li><a>ABOUT</a></li>
                  <li><a>ARCHIVES</a></li>
                  <li><a><Button className="sign-in" primary>Sign In</Button></a></li>
              </ul>
          </header>
  </StyledNavbar>
    )
}

export default Header