import React, { useState, useEffect, useRef } from 'react'
import { StyledWrapper } from '../../views/Home/styles'
import { StyledAudioPlayer,
         StyledClipContainer,
         StyledSuggestionContainer,
         StyledYouMightAlsoLikeContainer
} from './styles'
import { Link, Redirect } from 'react-router-dom'
import { Container, Item, Label, Popup, Card, Button } from 'semantic-ui-react'
import { useFetch, cleanTitleName, initialPeaksOptions } from '../../utils'
import Spinner from '../../components/Spinner'
import Peaks from 'peaks.js'
import _ from 'lodash'

const FileCard = props => {
 const [peaksOptions, setPeaksOptions] = useState(null)
 const [isPlaying, setIsPlaying] = useState(false)
 const [youMightAlsoLike, setYouMightAlsoLike] = useState([])
 const [createClip, setCreateClip] = useState(false)
 const [currentTimeValue, setCurrentTimeValue] = useState("00:00")
 const [percentPlayed, setPercentPlayed] = useState(0)
 const { title, date, tags, key } = props.location.state
 const [currentChunk, setCurrentChunk] = useState(0)
 let { response, loading } = useFetch(`http://localhost:5000/file/${key}`)
 if(response && response.url) console.log(response.url)
 const media = useRef(null);
 const seekObj = React.createRef();
 const percentage = React.createRef()
 const currentTime = React.createRef()
//  const overviewContainer = useRef(null);
//  const mediaElement = useRef(null);
//  const zoomViewContainer = useRef(null);

 useEffect(() => {
  if(date) {
    fetch(`http://localhost:5000/audio/similar`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date }),
    })
    .then(response => response.json())
    .then(similarTracks => {
      const filteredSimilarTracks = similarTracks.reduce((acc, current) => {
        const x = acc.find(item => item.s3_etag === current.s3_etag);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      setYouMightAlsoLike(_.chunk(filteredSimilarTracks, 3))
    })
    return () => setYouMightAlsoLike([])
  }
 }, [date])

 useEffect(() =>{
    if(loading) window.scrollTo(0,0)
  })

 const updateQueue = () => {
  const numberOfSimilarTracks = youMightAlsoLike.length
  currentChunk === numberOfSimilarTracks - 1 ? setCurrentChunk(0) : setCurrentChunk(currentChunk + 1)
  console.log({after: currentChunk})
 }

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

const handleTimeUpdate = (event) => {
  setCurrentTimeValue(calculateCurrentValue(event.target.currentTime))
  setPercentPlayed(
    (media.current.currentTime / media.current.duration).toFixed(2) * 100
  );
}

const onEnded = () => {
  percentage.current.style.width = 0
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
                  <audio ref={media} onTimeUpdate={initProgressBar} onEnded={onEnded} id="audio">
                    <source src={response && response.url} type="audio/mp3" />
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
                      <Link to={{pathname:`/clip`, state: { title, date, tags, key, response, loading } }}>
                        <Popup
                              trigger={<img 
                                className="clip-img"
                                src="../assets/icons/clip.svg"
                                alt="clip"
                              />}
                              content="Create Audio Clip"
                              basic
                              position="bottom right"
                            />
                      </Link>
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
        </Item>
      }
      {
        date && youMightAlsoLike.length ? 
        <StyledYouMightAlsoLikeContainer>
          <h3>You might also like: </h3>
          <StyledSuggestionContainer>
              {youMightAlsoLike[currentChunk].map(similarTrack => {
              return (<Card>
                <Card.Content>
                  <Card.Header>{similarTrack.audio_title}</Card.Header>
                  <Card.Meta>
                    <span className='date'>{similarTrack.audio_date}</span>
                  </Card.Meta>
                  <Card.Description>
                    {similarTrack.audio_tags}
                  </Card.Description>
                </Card.Content>
              </Card>)
            })}
            <div>
              <Button
                disabled={currentChunk === youMightAlsoLike.length}
                circular
                className="button-next"
                onClick={() => updateQueue()}
                icon="angle right"
              />
            </div>
          </StyledSuggestionContainer>
        </StyledYouMightAlsoLikeContainer>
        : <></>
      }
     </StyledWrapper>
   )
}

export default FileCard