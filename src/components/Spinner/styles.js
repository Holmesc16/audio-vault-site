import styled from 'styled-components'

export const StyledContainer = styled.div`
.lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    margin:auto;
  }
  .lds-ripple div {
    position: absolute;
    border: 1px solid #ffcc22;
    opacity: 1;
    background-color:red;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
    background-color:blue;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`