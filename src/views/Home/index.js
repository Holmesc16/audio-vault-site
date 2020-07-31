import React, { useContext } from "react";
import { StyledWrapper } from "./styles";
import Spinner from '../../components/Spinner'
// import { useScrollTop } from '../../utils'
// import {debounce} from 'lodash'
import AudioCard from '../../components/AudioCard'

const Home = React.memo(function Home(props) {  
  let currentIndex = 0
  console.log()
  return (
      <div className="container">
          <StyledWrapper className="audio-wrapper">
            {props.loading ? <Spinner/> : 
              <div>
                <AudioCard audio={props.audio} index={currentIndex}/>
              </div>
            }
          </StyledWrapper>
      </div>
  )
})

export default Home;