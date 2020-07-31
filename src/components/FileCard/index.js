import React, { useState, useEffect } from 'react'
import { StyledWrapper } from '../../views/Home/styles'
import { StyledAudioPlayer } from './styles'
import { Item, Label } from 'semantic-ui-react'
import { useFetch, cleanTitleName } from '../../utils'
import Spinner from '../../components/Spinner'

const FileCard = props => {
 
 const [src, setSrc] = useState(null)
 const [isPlaying, setIsPlaying] = useState(false)
 const { title, date, tags, key } =props.location.state
 console.log()
 let { response, loading } = useFetch(`http://localhost:5000/file/${key}`)
 
  useEffect(() => {
       return function cleanup() {
        if(response !== null && response !== 'undefined') {
          setSrc(response.url)
          window.location.pathname !== '/' ? window.scrollTo(0,126) : window.scrollTo(0,0)
        }
    }
  })

 const media = React.createRef()
 const percentage = React.createRef();
 const seekObj = React.createRef();
 const currentTime = React.createRef();

 const togglePlay = () => {
    let audioIsPlaying = media.current.currentTime > 0 && !media.current.paused && media.current.readyState > 2;

    if (!audioIsPlaying) {
      media.current.play();
    } else {
      media.current.pause();
    }

    setIsPlaying(!isPlaying)
};

const calculatePercentPlayed = () => {
  let percentPlayed = (media.current.currentTime / media.current.duration).toFixed(2) * 100;
  percentage.current.style.width = `${percentPlayed}%`;
}

const calculateCurrentValue = currentTime => {
  const currentMinute = parseInt(currentTime / 60) % 60;
  const currentSecondsLong = currentTime % 60;
  const currentSeconds = currentSecondsLong.toFixed();
  const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${
  currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
  }`;

  return currentTimeFormatted;
}

const initProgressBar = () => {
  const currentTimeValue = calculateCurrentValue(media.current.currentTime);

  function seek(e) {
    const percent = e.offsetX / seekObj.current.offsetWidth;
    media.current.currentTime = percent * media.current.duration;
  }
  //media.current.innerText = currentTimeValue
  currentTime.current.innerHTML= currentTimeValue
  seekObj.current.addEventListener('click', seek);
  calculatePercentPlayed();
}

const onEnded = () => {
  percentage.current.style.width = 0;
  currentTime.current.innerHTML = '00:00';

  setIsPlaying(false)
}

 return (
    
     <StyledWrapper>
      { loading ? <Spinner/> :
        <Item>
          <Item.Content>
              <h1>{title}</h1>
              <StyledAudioPlayer className="player-wrapper">
                <div className="audio-player">
                  <audio ref={media} onTimeUpdate={initProgressBar} onEnded={onEnded} id="audio">
                    <source src={src} type="audio/mp3" />
                  </audio>
                  <div className="player-controls">
                    <div id="radioIcon"></div>
                    <button onClick={togglePlay} className={isPlaying === false ? 'play' : 'pause'} id="playAudio"></button>
                    <div id="seekObjContainer">
                      <div ref={seekObj} id="seekObj">
                        <div id="percentage" ref={percentage}></div>
                      </div>
                    </div>

                    <p><small id="currentTime" ref={currentTime}>00:00</small></p>

                  </div>
                </div>
              </StyledAudioPlayer>
              <h2>{date}</h2>
              <Item.Extra className="audio tags-container">
              {tags
              .split(',')
              .map(tag => tag.length ? <Label key={tag} className="audio tag">{tag}</Label> : '')}
              </Item.Extra>
          </Item.Content>
        </Item>
      }
     </StyledWrapper>
   )
}

export default FileCard