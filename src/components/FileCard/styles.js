import styled from 'styled-components'

export const StyledContainer = styled.div`
display:flex;
flex-direction: row;
`

export const StyledAudioPlayer = styled.div`
display:inline-block;

.audio-player {
    width: 470px;
    padding: 35px 20px;
    margin: auto;
    background-color: white;
    border: 2px solid #0435cd;
    border-radius: 50px;
    box-shadow: 14px 9px 4px #999;
  
    .player-controls {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    #playAudio {
      -webkit-appearance: none;
      outline: none;
      cursor: pointer;
      border: none;
      width: 30px;
      height: 30px;
      background: url('https://image.flaticon.com/icons/svg/149/149125.svg') no-repeat center;
      background-size: contain;
  
      &.pause {
        background: url('https://image.flaticon.com/icons/svg/149/149127.svg') no-repeat center;
        background-size: contain;
      }
    }
  
    p {
      margin: 0 0 0 5px;
      line-height: 1;
      display: inline-flex;
  
      small {
        font-size: 10px;
      }
    }
  
    #seekObjContainer {
      position: relative;
      width: 300px;
      margin: 0 5px;
      height: 5px;
  
      #seekObj {
        position:relative;
        width: 100%;
        height: 100%;
        background-color: #e3e3e3;
        border: 1px solid black;
  
        #percentage {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background-color: coral;
        }
      }
    }
  }
`