import React, { useState, useEffect } from 'react'
import { StyledWrapper } from '../../views/Home/styles'
import { StyledAudioPlayer } from './styles'
import { Container, Item, Label, Popup } from 'semantic-ui-react'
import { useFetch, cleanTitleName, initialPeaksOptions } from '../../utils'
import Spinner from '../../components/Spinner'
import Peaks from 'peaks.js'

const FileCard = props => {
 const [peaksOptions, setPeaksOptions] = useState(initialPeaksOptions)
 const [src, setSrc] = useState(null)
 const [isPlaying, setIsPlaying] = useState(false)
 const { title, date, tags, key } = props.location.state
 let { response, loading } = useFetch(`http://localhost:5000/file/${key}`)
 
 const updatePeaks = () => {
   Peaks.init(peaksOptions, (err, peaks) => {
     if(err) {
      console.error(`failed to init Peaks instance: ${err.message}`)
      return
     }
     console.log(peaks.player.getCurrentTime())
   })
   console.log(peaksOptions)
 }

 useEffect(() => {
  return async function cleanup() {
    if(response !== null && response !== 'undefined') {
      setSrc(await response.url)
    }
  }
})

useEffect(() => {
  return async function cleanup() {
    debugger;
    if(response !== null && response !== 'undefined') {
      return new Promise((resolve, reject) => {
        setPeaksOptions(prevState => ({...prevState, dataUri: response.buffer.data}))
        resolve(peaksOptions)
        reject(err => console.log(`error in Peaks hook: ${err}`))
      })
      .then(() => updatePeaks())
    }
    console.log(peaksOptions)
  }
}, [response])

 useEffect(() =>{
    const scrollTop = () => window.scrollTo(0,0)
    scrollTop()
    return scrollTop()
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
                  <div className="interactive-controls">
                    <div className="clip-container">
                    <Popup
                          trigger={<img 
                            className="clip-img"
                            src="../assets/icons/clip.svg"
                            onClick={() => console.log('clip click')}
                          />}
                          content="Create Audio Clip"
                          basic
                          position="bottom right"
                        />
                    </div>
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
          <Container>
            <div id="overview-container"></div>
              <audio src={src} id="peaks-audio"></audio>
              <div id="zoomview-container"></div>
          </Container>
        </Item>
      }
     </StyledWrapper>
   )
}

export default FileCard