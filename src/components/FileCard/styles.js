import styled from 'styled-components'

export const StyledContainer = styled.div`
display:flex;
flex-direction: row;
`

export const StyledAudioPlayer = styled.div`
display:inline-block;
font-family: 'Avenir Next', Helvetica;
.audio-player {
    width: 470px;
    padding: 35px 20px;
    margin: auto;
    background-color: white;
    border: 2px solid #0435cd;
    border-radius: 50px;
    box-shadow: 14px 9px 4px #999;
    height: 155px;
  
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
          background-color: #ffcc22;
          border-right: 1px solid #000;
        }
      }
    }
    .interactive-controls {
    margin: 12px 14px 0px 0px;
    }
    img.clip-img {
      width: 45px;
      cursor: pointer;
      margin-left: 10px;
      padding-left: 8px;
      border: .5px solid #ddd;
      box-shadow: 3px 2px 5px #eee, -2px -3px 6px #eee;
      border-radius: 16px;
      margin-top: 12px;
    }
  }
`

export const StyledSuggestionContainer = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    grid-auto-flow: column;
    grid-gap: 3em;

    > .ui.card {
        display: grid;
        height: 100%;
        align-items: flex-start;

        .header, .description, .date {
          font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        &:first-child {
          margin-top: auto !important;
        }

        &:last-child {
          margin: 0 !important;
        }
    }
`

export const StyledYouMightAlsoLikeContainer = styled.div`
  font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin-top: 10em;
`