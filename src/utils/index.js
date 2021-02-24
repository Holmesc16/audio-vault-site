import {useState, useEffect, useCallback, useRef} from 'react'
import aws from 'aws-sdk'
const _ = require('lodash')

export const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(url, options);
          setLoading(true)
          const json = await res.json();
          
          if(url.includes('file')) {
            setResponse(json)
        } else {
          let chunks = _.chunk(json, 30)
          setResponse(chunks)
        }
          setLoading(false)
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
    return { response, error, loading };
  };

  export const useIntersect = ({ root = null, rootMargin, threshold = 0}) => {
    const [entry, updateEntry] = useState({})
    const [node, setNode] = useState(null)

    const observer = useRef(null)

    useEffect(() => {
      if(observer.current) observer.current.disconnect()

      observer.current = new window.IntersectionObserver(
        ([entry]) => updateEntry(entry), 
        {
          root,
          rootMargin,
          threshold
        }
      )

      const { current: currentObserver } = observer
      if(node) currentObserver.observe(node)
      return () => currentObserver.disconnect()
    }, [node, root, rootMargin, threshold])
    return [setNode, entry]
  }
  
  export const useScrollTop = () => {  
    const [scrollTop, setScrollTop] = useState(0)
    
    useEffect(() => {
        const onScroll = e => {
          setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener("scroll", onScroll);
    
        return () => window.removeEventListener("scroll", onScroll);
      }, [scrollTop]);
    return scrollTop
}

const cleanFilename = filename => {
  return filename
  .replace(/['|“|”|‘|’]/gim, "'")
  .replace(/'/gim, "")
  .replace(/"/gim, "")
  .replace(/[…]/gim, "...")
  .replace('...', "")
  .replace(/–/gim, "-") //utf8 dash
  .replace(/[.]/gim, "_")
  .replace(/\+/gim, "_")
  .replace(/ /gim, "_")
  .replace(/\?/gim, "")
  .replace(/&/gim, 'and')
  .replace(/\*/gim, "")
  .replace(/:/gim, "")
  .replace(/\(\)/gim, "")
  .replace(/-/gim, "")
   .replace(/__/g, '_')
    // need to replace all white spaces, slashes, special chars and do an entire reupload
};

export const cleanTitleName = title => title.replace(/_/gi, ' ')

export const cleanDate = date => date.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'/')

export const readableName = name => {
  let s = name.substr(-6)
  name = name.replace(s, '')
  name = cleanTitleName(name)
  if(typeof(name.substr(-1) === 'number')) {
    name = name.replace(name.substr(-1), '')
    return name
  } 
  return name
}
export const removeSuperfluousDate = title => {
  let removeNumbersAndSpaces = title => title = title.replace(title.substr(-1), '')

  let s = title.substr(-8)
  title = title.replace(s, '')
  
  if(typeof(title.substr(-1) === 'number')) {
      removeNumbersAndSpaces(title)
      return title
  }
  return title.trim() 
}

export const initialPeaksOptions = {
  containers: {
    zoomview: document.getElementById('zoomview-container'),
    overview: document.getElementById('overview-container'),
    mediaElement: document.querySelector('audio#peaks-audio'),
    // dataUri: {
    //   arraybuffer: null,
    // },
    withCredentials: false,
    webAudio: {
      audioContext: new AudioContext(),
      audioBuffer: null, // provide an AudioBuffer from s3 with the decoded audio >> NOTE: if this is used, AudioContext prop is not needed
      multiChannel: false
    },
    logger: console.error.bind(console), // async log func
    emitCueEvents: false, // if true, emit cue events on Peaks instance
    height: 200,
    zoomLevels: [512, 1024, 2048, 4096],
    keyboard: false, // binds keyboard controls
    nudgeIncrement: 0.01, // nudge increment controls with left/right arrows
    segmentStartMarkerColor: '#ffcc22', // segment start marker handles
    segmentEndMarkerColor: '#ffcc22',
    zoomWaveformColor: 'rgba(25, 005, 208, 1)', //color for zoomable waveform 
    overviewWavefromColor: 'rgba(0,0,0,0.2)',
    overviewHighlightColor: '#999',
    overviewHighlightOffset: 11, // default # of pixels from top & bottom of canvas that overviewHighlight takes up
    segmentColor: 'rgba(255, 1, 9, 1)', // color for segments on waveform
    playheadColor: 'rgba(0, 0, 0, 1)',
    playheadTextColor: '#aaa',
    timeLabelPrecision: 2, // precision of time label of play head and point/segment markers
    showPlayheadTime: false, // (zoom view only) show current time next to play head
    pointMarkerColor: '#ff0990',
    axisGridlineColor: '#ccff00', // color of axis gridlines
    axisLabelColor: '#000', // color of axis labels
    randomizeSegmentColor: true, // overrides @segmentColor
    fontFamily: 'Avenir Next, Helvetica',
    fontSize: 11, // font size for axis labels, playhead, and point / segment markers
    fontStyle: 'normal', // style, matches format for size
    segments: [ // array of initial segment objects with StartTime and EndTime in secs and a boolean for editable
      {
        startTime: 120,
        endTime: 140,
        editable: true,
        color: '#0099ff',
        labelText: 'Start Clip'
      },
      { 
        startTime: 220,
        endTime: 240,
        editable: true,
        color: '#0099ff',
        labelText: 'End Clip'
      }
    ],
    points: [
      {
        time: 150,
        editable: true,
        color: '#00ff00',
        labelText: 'Audio Point'
      },
      {
        time: 160,
        editable: true,
        color: '#00ff00',
        labelText: '2nd Audio Point'
      }
    ]
  }

}
export default {cleanTitleName, cleanDate, readableName, removeSuperfluousDate, initialPeaksOptions}