import React from 'react'
import StyledNavbar from './styles'
import { Button } from 'semantic-ui-react'
import { useScrollTop } from '../../utils'


const Navigaton = React.memo(function Navigation(props) {
  let scrollTop = useScrollTop()
  let Logo = document.getElementById("logo");
  let endOfDocumentTop = 60
  if(Logo) {
  Logo.className = scrollTop > endOfDocumentTop ? 'smallLogo' :  'largeLogo'
  }
  return (
      <StyledNavbar>
    <header className="header">
          <a><img id="logo" alt="logo" src="assets/icons/logo.png" width="330"/></a>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
          <ul className="menu">
              <li><a>ABOUT</a></li>
              <li><a>ARCHIVES</a></li>
              <li><a><Button className="sign-in" primary>Sign In</Button></a></li>
          </ul>
      </header>
  </StyledNavbar>
    )
})

export default Navigaton