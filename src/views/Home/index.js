import React from "react";
import { StyledWrapper } from "./styles";
import Spinner from '../../components/Spinner'
import AudioCard from '../../components/AudioCard'

const Home = React.memo(function Home(props) {  
  let currentIndex = 0
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