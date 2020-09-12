import styled from 'styled-components'
import fontStyle from '../../ui/AppStyles'

 const StyledNavbar = styled.nav`
 @import url('https://fonts.googleapis.com/css?family=Covered+By+Your+Grace&display=swap');
 * {
  ${fontStyle};
 } 
 *:focus {
      outline:none;
  }
  
  a {
    color: #000;
  }

  #logo{
    transition: all .5s;
  }
  .largeLogo{
    width: 300px;
  }
  .smallLogo{
    width: 200px;
  }

  .header {
    background-color: #fff;
    box-shadow: 1px 1px 4px 0 rgba(0,0,0,.1);
    position: fixed;
    width: 100%;
    z-index: 3;
  }
  
  .header ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    background-color: #fff;
  }
  ul.menu > li {
    color:black;
    text-shadow:none;
  }
  .header li a {
    display: block;
    padding: 20px 20px;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: none;
    }
  }
  .border {
    position:relative;
    &:hover::after {
      content:'';
      position: absolute;
      width: 50%;
      height: 0;    
      left:30px;
      bottom:12px;
      border-bottom: 6px solid rgba(36, 30, 227, 0.9); 
       transition: width .3s;
    }
  }
  button.sign-in {
    font-weight: 600 !important;
  }
  button.ui.button.username {
    margin-right: 20px;
    margin-top: 12px;
    background: rgba(36, 30, 227, 0.9);
    color: white;
    letter-spacing: .8px;
    font-weight: 600;
}
  .header .logo {
    display: block;
    float: left;
    font-size: 2em;
    padding: 10px 20px;
    text-decoration: none;
  }
  
  /* menu */
  
  .header .menu {
    clear: both;
    max-height: 0;
    transition: max-height .2s ease-out;
  }
  
  /* menu icon */
  
  .header .menu-icon {
    cursor: pointer;
    display: inline-block;
    float: right;
    padding: 28px 20px;
    position: relative;
    user-select: none;
  }
  
  .header .menu-icon .navicon {
    background: #ab1000;
    display: block;
    height: 2px;
    position: relative;
    transition: background .2s ease-out;
    width: 18px;
  }
  
  .header .menu-icon .navicon:before,
  .header .menu-icon .navicon:after {
    background: #ab1000;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    transition: all .2s ease-out;
    width: 100%;
  }
  
  .header .menu-icon .navicon:before {
    top: 5px;
  }
  
  .header .menu-icon .navicon:after {
    top: -5px;
  }
  
  /* menu btn */
  
  .header .menu-btn {
    display: none;
  }
  
  .header .menu-btn:checked ~ .menu {
    max-height: 255px;
    // margin-top:35px;
  }
  
  .header .menu-btn:checked ~ .menu-icon .navicon {
    background: transparent;
  }
  
  .header .menu-btn:checked ~ .menu-icon .navicon:before {
    transform: rotate(-45deg);
  }
  
  .header .menu-btn:checked ~ .menu-icon .navicon:after {
    transform: rotate(45deg);
  }
  
  .header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
  .header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
    top: 0;
  }
  
  /* 48em = 768px */
  
  @media (min-width: 48em) {
    .header li {
      float: left;
    }
    .header li a {
      padding: 20px 30px;
    }
    .header .menu {
      clear: none;
      float: right;
      max-height: none;
      // margin-top:35px;
    }
    .header .menu-icon {
      display: none;
    }
  }
  
  .ui.primary {
      background-color:#AB1000;

      &:hover, &:focus {
          background-color:#FF0111;
      }
  }
  .ui.secondary {
    background-color:#001A69;

        &:hover, &:focus {
            background-color: #001AF9;
        }
}
  .ui.primary, .ui.secondary {
      font-family:inherit;
      margin-top:-16px;
      ${fontStyle};
  }
  a {
    text-decoration: none;
    color: black;
    font-size: 1.4rem;
    letter-spacing: 1.5px;
    margin-right: 12px;
        &:hover {
          text-decoration:underline;
          cursor:pointer;
          transition:font-size .2s ease-in-out;
        } &:focus {
            text-shadow: 2px 2px #ffcc22;
            cursor:pointer;
        }
  }

  `

  export default StyledNavbar