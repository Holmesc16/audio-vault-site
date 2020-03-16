import styled from 'styled-components'

export const StyledWrapper = styled.div`
    min-height: 100%;
    position: absolute;
    top: 349px;
    padding: 30px 50px;
    width:100%;
    margin-bottom: 75px;

  .ui.label.audio.tag:hover {
    background: #cb1616;
    color: white;
    cursor:pointer;
    transition:background .2s ease-in-out;
    // transition:color .1s ease-in-out;
    box-shadow: 2px 2px 12px #999;
    }

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding-top: 75px;
  }
  
  .column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
  }
  
  
@media screen and (max-width: 768px) {
    .column {
      flex: 2;
      height:100%;
    }
  }

  @media screen and (min-width: 768px) {
    .column {
      flex: 1;
      height:100%;
    }
  }
`  