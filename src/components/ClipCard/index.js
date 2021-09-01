import React, { useState, useRef, useEffect, useContext } from 'react'
import { StyledClipContainer } from './styles'
import { Button, Modal, Input, Dropdown, TextArea, Form } from 'semantic-ui-react'
import { useFetch } from '../../utils'
import Segment from '../peaks/Segment'
import Point from '../peaks/Point'
import Peaks from 'peaks.js'
import Konva from 'konva'
import axios from 'axios'
import UserContext from "../../UserContext";

const ClipCard = props => {
  const { user } = useContext(UserContext)

  const initialPeaksOptions = {
    withCredentials: false,
    logger: console.error.bind(console), // async log func
    emitCueEvents: false, // if true, emit cue events on Peaks instance
    height: 200,
    zoomLevels: [512, 1024, 2048, 4096],
    keyboard: false, // binds keyboard controls
    nudgeIncrement: 0.01, // nudge increment controls with left/right arrows
    segmentStartMarkerColor: "#ffcc22", // segment start marker handles
    segmentEndMarkerColor: "#ffcc22",
    zoomWaveformColor: "rgba(25, 005, 208, 1)", //color for zoomable waveform
    overviewWavefromColor: "rgba(0,0,0,0.2)",
    overviewHighlightColor: "#999",
    overviewHighlightOffset: 11, // default # of pixels from top & bottom of canvas that overviewHighlight takes up
    segmentColor: "rgba(255, 1, 9, 1)", // color for segments on waveform
    playheadColor: "rgba(0, 0, 0, 1)",
    playheadTextColor: "rgba(0, 0, 0, 1)",
    timeLabelPrecision: 2, // precision of time label of play head and point/segment markers
    showPlayheadTime: true, // (zoom view only) show current time next to play head
    pointMarkerColor: "#ff0990",
    axisGridlineColor: "#ccff00", // color of axis gridlines
    axisLabelColor: "#000", // color of axis labels
    randomizeSegmentColor: true, // overrides @segmentColor
    fontFamily: "Avenir Next, Helvetica",
    fontSize: 11, // font size for axis labels, playhead, and point / segment markers
    fontStyle: "normal", // style, matches format for size
  }
    const [peaksInstance, setPeaksInstance] = useState(null)
    const [peaksOptions, setPeaksOptions] = useState(null)
    const [peaksSegments, setPeaksSegments] = useState([])
    const [showSegmentModal, setShowSegmentModal] = useState(false)
    const [segmentName, setSegmentName] = useState('')
    const [segmentTags, setSegmentTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [segmentDescription, setSegmentDescription] = useState('')
    const [audioClip, setAudioClip] = useState(null)
    const media = useRef(null);
    const overviewContainer = useRef(null);
    const mediaElement = useRef(null);
    const zoomViewContainer = useRef(null);
   
    const { title, date, tags, key, response, loading } = props.location.state
    const { url: audioUrl } = response
    
    const getSegmentTags = () => {
      axios.get(`http://localhost:5000/tags`)
      .then(response => response.data.map(s => ({id: s.id, name: s.tagname})))
      .then(data => setSegmentTags(data))
    }

    const handleSegmentName = e => {
      const name = e.target.value
      return setSegmentName(name)
    }

    const handleSegmentTags = (e, data, method) => {
      if(method == 'change') {
        let changeValue = data.value.length == 1 ? data.value[0] : data.value[data.value.length]
        let newValue = data.options.filter(v => v.value === changeValue)
        if(newValue.length && newValue !== undefined) {
          setSelectedTags(prev => [...prev, { id: newValue[0].key, name: changeValue }])
        } else return
      }
      if(method == 'addItem') {
        console.log('target', e.target.value)
        setSelectedTags(prev => [...prev, {  }])
      }
    }

    class CustomSegmentMarker {
      constructor(options) {
        // required
        this._options = options
      }
      init(group) {
        // required
        const layer = this._options.layer
        const height = layer.getHeight()

        this._handle = new Konva.Rect({
          x: -20,
          y: 0,
          width: 40,
          height: 20,
          fill: this._options.color,
          labelText: segmentName,
        })
        // this._text = new Konva.Text({
        //   text: segmentName,
        //   x: -20,
        //   y: 0,
        //   fontSize: 12,
        //   fontFamily: 'Avenir Next'
        // })

        this._line = new Konva.Line({
          points: [0.5, 0, 0.5, height], // x1, y1, x2, y2
          strokeWidth: 1
        })
        
        group.add(this._handle)
        group.add(this._line)
        // group.add(this._text)

        this._handle.on('mouseenter', () => {
          console.log({group}, this._handle, this._line)
          const highlightColor = '#ff0000';
          this._handle.fill(highlightColor);
          this._line.stroke(highlightColor);
          layer.draw();
        });

        this._handle.on('mouseleave', () => {
          const defaultColor = this._options.color;
          this._handle.fill(defaultColor);
          this._line.stroke(defaultColor);
          layer.draw();
        });
      }
      fitToView() {
        // required
        const layer = this._options.layer;
        const height = layer.getHeight();
      
        this._line.points([0.5, 0, 0.5, height]);
      }
      timeUpdated(startTime, endTime) {
        // optional
        console.log({ startTime, endTime })
      }
      destroy() {
        // optional
        console.log('Marker destroyed!')
      }
    }

    const postAudioClip = (url, clipName, description, tags, date, startTime, endTime, user) => {
      axios.post('http://localhost:5000/clip', {
        url,
        clipName,
        segmentDate: date,
        description,
        tags,
        segmentStart: startTime,
        segmentEnd: endTime,
        user,
      })
      .then(response => response.json())
      .then(data => setAudioClip(data))
    }

    const promptSegmentModal = e => {
      if(!segmentTags.length) getSegmentTags(e)
      setShowSegmentModal(true)
    }

    const createSegmentMarker = options => {
      return new CustomSegmentMarker(options)
    }

    const createSegmentLabel = options => {
      if (options.view === 'overview') {
        return null;
      }
    
      return new Konva.Text({
        text:       options.labelText,
        fontSize:   14,
        fontFamily: 'Avenir Next',
        fill:       'black'
      });
    }

    useEffect(() => {
        if (response)
          setPeaksOptions({
            ...initialPeaksOptions,
            webAudio: { 
              audioBuffer:  null,
              audioContext: new AudioContext(),
              multichannel: false,
            },
            mediaUrl: response.url,
            containers: {
              zoomview: zoomViewContainer.current,
              overview: overviewContainer.current,
            },
            mediaElement: mediaElement.current,
            emitCueEvents: true,
            createSegmentLabel,
            createSegmentMarker
          });
      }, [response]);
    
      useEffect(() => {
        if (peaksOptions) {
          Peaks.init(peaksOptions, (err, peaks) => {
              if (err) console.error(err)
              setPeaksInstance({...peaks, emitCueEvents: true})
            })
        }
      }, [peaksOptions])

      const currentTime = () => peaksInstance && peaksInstance.player.getCurrentTime()
      
      const addSegment = (labelText) => {
        peaksInstance.segments.add({
          labelText,
          startTime: currentTime(),
          endTime: currentTime() + 50,
          editable: true
        })
        setPeaksSegments(prevState => [...prevState, peaksInstance.segments._segments])
      }

      // useEffect(() => {
      //   if(peaksSegments.length && response) {
      //     instantiateAudioClip(
      //       audioUrl,
      //       peaksSegments[0][0]._startTime,
      //       peaksSegments[0][0]._endTime
      //     )
      //   }
      // }, [peaksSegments])
      const removeSegment = () => {
        peaksInstance.segments.removeAll()
        setPeaksSegments(prevState => [...prevState, peaksInstance.segments._segments])
      }

      const zoomIn = () => peaksInstance.zoom.zoomIn()
      const zoomOut = () => peaksInstance.zoom.zoomOut()
      
      useEffect(() => selectedTags.length ? console.log(selectedTags) : console.log(''), [selectedTags])
    return (
        <StyledClipContainer className="clip-container">
            <h1>Create clip for <span id="styled-title">"{title}"</span></h1>
                  <h3>Audio Overview: </h3>
                  <div ref={overviewContainer} id="overview-container"></div>
                  <h3>Zoom View: </h3>
                  <div ref={zoomViewContainer} id="zoomview-container"></div>
                  <audio controls="controls" ref={mediaElement} src={response && response.url} id="peaks-audio"></audio>
                  <div id="feature-buttons-group">
                    {
                      peaksInstance
                      && peaksInstance.segments
                      && peaksInstance.segments._segments
                      && peaksInstance.segments._segments.length < 1 ? 
                      <button id="btn-segment" type="text" onClick={promptSegmentModal}>
                    Create a Segment
                      </button>
                    : <></>
                    }
                    <button id="zoom-in" type="text" onClick={zoomIn}>Zoom In</button>
                    <button id="zoom-out" type="text" onClick={zoomOut}>Zoom Out</button>
                  </div>
                  <div>
                    <div id="segments">
                      {peaksInstance 
                        && peaksInstance.segments 
                        && peaksInstance.segments._segments
                        ? peaksInstance.segments._segments.map((segment) => {
                          return (
                          <Segment 
                            id={segment.id}
                            editable="true" //{segment.editable}
                            startTime={segment.startTime}
                            endTime={segment.endTime}
                            color={segment.color}
                            labelText={segment.labelText || segmentName}
                            removeSegment={removeSegment}
                            postAudioClip={postAudioClip}
                            segmentDate={date}
                            description={segmentDescription}
                            selectedTags={selectedTags}
                            user={user}
                            url={audioUrl}
                          />
                          )
                        })
                      : <></>
                    }
                    </div>
                    <Modal
                      dimmer="blurring"
                      open={showSegmentModal}
                      onClose={() => setShowSegmentModal(false)}
                    >
                      <Modal.Header>Create a Segment</Modal.Header>
                      <Modal.Content>
                        <p>
                          <b>The Audio Vault</b> allows you to create new segments from existing audio.
                        </p>
                        <p>
                          Complete the details below and your new Clip will be made available to all P1s.
                        </p>
                        <p style={{color: "#999"}}>
                          <i>Note: Your clip must be at least ten (10) seconds in length.</i>
                        </p>
                      </Modal.Content>
                      <Modal.Content>
                        <h4 style={{color: '#999'}}>
                          New clip by <u>{user ? user.username : ''},</u>
                          <i>&nbsp;&nbsp;&nbsp;{date ? date : ''}</i>
                        </h4>
                      </Modal.Content>
                      <Modal.Content>
                      <Form>
                        <Form.Field id="segment-name">
                          <label>Segment Name</label>
                          <Input
                          type="text"
                          placeholder="New segment name"
                          onChange={e => handleSegmentName(e)}
                          />
                        </Form.Field>
                        <Form.Field id="segment-tags" style={{marginTop: '12px'}}>
                        <label>Tags</label>
                        <Dropdown
                            id="tags-select"
                            placeholder='Create a tag or select existing tags'
                            label="Tags"
                            search
                            multiple
                            allowAdditions
                            selection
                            options={segmentTags.map(s => ({ key: s.id, text: s.name, value: s.name }))}
                            onAddItem={(e, data) => handleSegmentTags(e, data, 'addItem')}
                            onChange={(e, data) => handleSegmentTags(e, data, 'change')}
                        />
                        </Form.Field>
                        <Form.Field id="segment-description">
                          <label>Segment Description</label>
                          <TextArea label="description" placeholder="Give a Description of the Segment" style={{fontFamily: 'inherit'}} />
                        </Form.Field>
                      </Form>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button negative onClick={() => setShowSegmentModal(false)}>
                          Cancel
                        </Button>
                        <Button
                          style={{backgroundColor: 'rgba(36,30,227,0.9)', color: '#fff'}}
                          disabled={segmentName === '' }
                          onClick={e => {
                            const newSegment = createSegmentMarker({
                            ...e,
                            view: 'overview',
                            //  segment: peaksInstance.segments[0],
                            layer: peaksInstance.segments._segments[0],
                            draggable: true,
                            color: '#ffcc22',
                            fontFamily: 'Avenir Next',
                            fontSize: 10,
                            fontShape: 'normal',
                            startMarker: true,
                            })
                            setShowSegmentModal(false)
                            if(peaksInstance) {
                              addSegment(segmentName)
                              createSegmentLabel({...peaksInstance.segments._segments[0], labelText: segmentName})
                            }
                            return newSegment
                          }
                        }>
                          Create Segment
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  </div>
        </StyledClipContainer>
    )
}

export default ClipCard;