import { createGlobalStyle } from 'styled-components'

  export const _opacity = `opacity:85%;
  transition: opacity .3s ease-out;
    -moz-transition: opacity .3s ease-out;
    -webkit-transition: opacity .3s ease-out;
    -o-transition: opacity .3s ease-out;
    
    &:hover {
      opacity:100%;
    }`
export const _grow = `
    transition: all .2s ease-in-out;
    &:hover { transform: scale(1.1);`
  
export const fontStyle = `
visibility: visible;
font-family: 'Avenir Next', Segoe UI, Helvetica, Arial, Sans-serif;
font-style: normal;
font-weight: 400;
color: white;
font-size:${props => props.size || '1.1rem'};
// text-transform:uppercase;
`
export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Avenir Next';
    font-style: medium;
    font-weight: 400;
    src: url('../public/assets/typeface/Avenir/AvenirNext-Regular.tff') format('truetype');
}
@font-face {
    font-family: 'Avenir Next Bold';
    font-weight: 600;
    src: url('../public/assets/typeface/Avenir/AvenirNext-Bold.tff') format('truetype');

}
@font-face {
    font-family: 'Avenir Next DemiBold';
    font-weight: 600;
    src: url('../public/assets/typeface/Avenir/AvenirNext-DemiBold.tff') format('truetype');

}
body, * {
 font-family: 'Avenir Next', Segoe UI, Helvetica, Arial, Sans-serif;  
}
`

export default fontStyle