import React, { useState, useRef, useEffect } from 'react'
import { StyledClipContainer } from './styles'
import { audioClipper } from '../../utils'
import Segment from '../peaks/Segment'
import Point from '../peaks/Point'
import Peaks from 'peaks.js'
import Konva from 'konva'

const ClipCard = props => {
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
    const media = useRef(null);
    const overviewContainer = useRef(null);
    const mediaElement = useRef(null);
    const zoomViewContainer = useRef(null);
   
    const { title, date, tags, key, response, loading } = props.location.state

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
          fill: this._options.color
        })

        this._line = new Konva.Line({
          points: [0.5, 0, 0.5, height], // x1, y1, x2, y2
          strokeWidth: 1
        })
        
        group.add(this._handle)
        group.add(this._line)
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

    const createSegmentMarker = options => {
      return new CustomSegmentMarker(options)
    }

    const createSegmentLabel = options => {
      if (options.view === 'overview') {
        return null;
      }
    
      return new Konva.Text({
        text:       options.segment.labelText,
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

      useEffect(() => peaksInstance ? console.log(peaksInstance) : console.log('nada'))

      const currentTime = () => peaksInstance && peaksInstance.player.getCurrentTime()
      
      const addSegment = () => {
        peaksInstance.segments.add({
          startTime: currentTime(),
          endTime: currentTime() + 50,
          editable: true
        })
        setPeaksSegments(prevState => [...prevState, peaksInstance.segments._segments])
      }

      const zoomIn = () => peaksInstance.zoom.zoomIn()
      const zoomOut = () => peaksInstance.zoom.zoomOut()
      
    return (
        <StyledClipContainer className="clip-container">
            <h1>Create clip for <span id="styled-title">"{title}"</span></h1>
                  <h3>Audio Overview: </h3>
                  <div ref={overviewContainer} id="overview-container" onDoubleClick={
                    e => {
                      // @TODO: add index to handler to identify which clip is being created,
                      // then handle `CreateSegmentMarker` according to which index is being invoked (?)
                      console.log(peaksInstance.segments)
                      return createSegmentMarker({
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
                    })}
                    }></div>
                  <h3>Zoom View: </h3>
                  <div ref={zoomViewContainer} id="zoomview-container"></div>
                  <audio controls="controls" ref={mediaElement} src={response && response.url} id="peaks-audio"></audio>
                  <div id="feature-buttons-group">
                    <button id="btn-segment" type="text" onClick={addSegment}>Create a Segment</button>
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
                            editable={segment.editable}
                            startTime={segment.startTime}
                            endTime={segment.endTime}
                            color={segment.color}
                          />
                          )
                        })
                      : <></>
                    }
                    </div>
                  </div>
        </StyledClipContainer>
    )
}

export default ClipCard;