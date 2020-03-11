import React, { useState, useEffect } from "react";
import { StyledWrapper } from "./styles";
import Spinner from '../../components/Spinner'
import { useScrollTop } from '../../utils'
import {debounce} from 'lodash'
import AudioCard from '../../components/AudioCard'

const Home = React.memo(function Home(props) {
  const currentIndex = 0
 
  return (
      <div className="container">
          <StyledWrapper>
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