import React, { useState, useEffect, useRef } from 'react'
import { StyledWrapper } from '../../views/Home/styles'
import { StyledAudioPlayer } from './styles'
import { Container, Item, Label, Popup } from 'semantic-ui-react'
import { useFetch, cleanTitleName, initialPeaksOptions } from '../../utils'
import Spinner from '../../components/Spinner'
import Peaks from 'peaks.js'

const FileCard = props => {
 const [peaksOptions, setPeaksOptions] = useState(null)
 const [isPlaying, setIsPlaying] = useState(false)
 const [currentTimeValue, setCurrentTimeValue] = useState(0)
 const [percentPlayed, setPercentPlayed] = useState(0)
 const { title, date, tags, key } = props.location.state
 let { response, loading } = useFetch(`http://localhost:5000/file/${key}`)
 
 const media = useRef(null);
 const seekObj = React.createRef();
 const overviewContainer = useRef(null);
 const mediaElement = useRef(null);
 const zoomViewContainer = useRef(null);

  useEffect(() => {
    if (response)
      setPeaksOptions({
        ...initialPeaksOptions,
        dataUri: {
          arraybuffer: response.buffer.data
        },
        mediaUrl: response.url,
        containers: {
          zoomview: zoomViewContainer.current,
          overview: overviewContainer.current,
        },
        mediaElement: mediaElement.current
      });
  }, [response]);

  useEffect(() => {
    if (peaksOptions) {
      Peaks.init(peaksOptions, (err, peaks) => {
          if (err) console.error(err)
          else console.log(peaks)
        })
    }
  }, [peaksOptions])

 useEffect(() =>{
    window.scrollTo(0,0)
  })

 const togglePlay = () => {
    let audioIsPlaying = 
      media.current.currentTime > 0 
      && !media.current.paused 
      && media.current.readyState > 2;

    if (!audioIsPlaying) {
      media.current.play();
    } else {
      media.current.pause();
    }

    setIsPlaying(!isPlaying)
};

const calculateCurrentValue = currentTime => {
  const currentMinute = parseInt(currentTime / 60) % 60;
  const currentSecondsLong = currentTime % 60;
  const currentSeconds = currentSecondsLong.toFixed();
  const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${
  currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
  }`;

  return currentTimeFormatted;
}

  function seek(e) {
    const percent = e.offsetX / e.target.offsetWidth;
    media.current.currentTime = percent * media.current.duration;
  }

const handleTimeUpdate = (event) => {
  setCurrentTimeValue(calculateCurrentValue(event.target.currentTime))
  setPercentPlayed(
    (media.current.currentTime / media.current.duration).toFixed(2) * 100
  );
}

const onEnded = () => {
  setPercentPlayed(0)
  setCurrentTimeValue('00:00')
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
                  <audio ref={media} onTimeUpdate={handleTimeUpdate} onEnded={onEnded} id="audio">
                    <source src={response && response.url} type="audio/mp3" />
                  </audio>
                  <div className="player-controls">
                    <div id="radioIcon"></div>
                    <button onClick={togglePlay} className={isPlaying === false ? 'play' : 'pause'} id="playAudio"></button>
                    <div id="seekObjContainer">
                      <div onClick={seek} id="seekObj">
                        <div id="percentage" style={{width: `${percentPlayed}%`}}></div>
                      </div>
                    </div>

                    <p><small id="currentTime">{currentTimeValue}</small></p>

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
            <div ref={overviewContainer} id="overview-container"></div>
              <audio ref={mediaElement} src={response && response.url} id="peaks-audio"></audio>
            <div ref={zoomViewContainer} id="zoomview-container"></div>
          </Container>
        </Item>
      }
     </StyledWrapper>
   )
}

export default FileCard