import styled from 'styled-components'

export const StyledClipContainer = styled.div`
  margin-top: 200px;
  padding: 40px;
  height: 100vh; //${props => props.height}
  
  h1 {
      font-family: 'Avenir Next', Arial, Helvetica, sans-serif !important;
  }
  #styled-title {
    -webkit-text-stroke: 1.5px black;
    -webkit-text-fill-color: white;
  }

  #feature-buttons-group  {
    margin: 5px 0;
    width: inherit;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

    > button {
      background-color: #fff;
      margin: 0 8px;
      font-family: 'Avenir Next',--apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;
      border: none;
      background: rgb(234 234 234);
      padding: 12px;
      border-radius: 12px;
      cursor: pointer;
      transition: box-shadow .2s;
       
       &:hover {
         box-shadow: 1px 1px 5px #999;
       }
     }
}
`