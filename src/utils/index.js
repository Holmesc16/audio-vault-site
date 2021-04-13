import { useState, useEffect, useCallback, useRef } from "react";
import aws from "aws-sdk";
const _ = require("lodash");

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        setLoading(true);
        const json = await res.json();

        if (url.includes("file")) {
          setLoading(false)
          setResponse(json);
        } else {
          let chunks = _.chunk(json, 30);
          setResponse(chunks);
          setLoading(false)
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return { response, error, loading };
};

export const useIntersect = ({ root = null, rootMargin, threshold = 0 }) => {
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(
      ([entry]) => updateEntry(entry),
      {
        root,
        rootMargin,
        threshold,
      }
    );

    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);
    return () => currentObserver.disconnect();
  }, [node, root, rootMargin, threshold]);
  return [setNode, entry];
};

export const useScrollTop = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  return scrollTop;
};

const cleanFilename = (filename) => {
  return filename
    .replace(/['|“|”|‘|’]/gim, "'")
    .replace(/'/gim, "")
    .replace(/"/gim, "")
    .replace(/[…]/gim, "...")
    .replace("...", "")
    .replace(/–/gim, "-") //utf8 dash
    .replace(/[.]/gim, "_")
    .replace(/\+/gim, "_")
    .replace(/ /gim, "_")
    .replace(/\?/gim, "")
    .replace(/&/gim, "and")
    .replace(/\*/gim, "")
    .replace(/:/gim, "")
    .replace(/\(\)/gim, "")
    .replace(/-/gim, "")
    .replace(/__/g, "_");
  // need to replace all white spaces, slashes, special chars and do an entire reupload
};

export const cleanTitleName = (title) => title.replace(/_/gi, " ");

export const cleanDate = (date) =>
  date
    .replace(/^(\d\d)(\d)$/g, "$1/$2")
    .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
    .replace(/[^\d\/]/g, "/");

export const readableName = (name) => {
  let s = name.substr(-6);
  name = name.replace(s, "");
  name = cleanTitleName(name);
  if (typeof (name.substr(-1) === "number")) {
    name = name.replace(name.substr(-1), "");
    return name;
  }
  return name;
};
export const removeSuperfluousDate = (title) => {
  let removeNumbersAndSpaces = (title) =>
    (title = title.replace(title.substr(-1), ""));

  let s = title.substr(-8);
  title = title.replace(s, "");

  if (typeof (title.substr(-1) === "number")) {
    removeNumbersAndSpaces(title);
    return title;
  }
  return title.trim();
};

const audioClipper = (audioUrl, segmentStart, segmentEnd) => {
  var _audioContext = new AudioContext() // new(AudioContext || webkitAudioContext)()
  debugger;
  // STEP 1: Load audio file using AJAX ----------------------------------
  fetch(audioUrl)
    .then((response) => {
      return response.arrayBuffer()
    })
    .then(decode());

  // STEP 2: Decode the audio file ---------------------------------------
  const decode = (buffer)  => {
    _audioContext.decodeAudioData(buffer, split);
  }

  // STEP 3: Split the buffer --------------------------------------------
  const split = (_buffer) => {
    // calc number of segments and segment length
    let channels = _buffer.numberOfChannels
    let duration = _buffer.duration
    let rate = _buffer.sampleRate
    let segmentLength = segmentEnd - segmentStart // Math.floor(segmentEnd - SegmentStart)
    let count = Math.floor(duration / segmentLength)
    let offset = 0
    let block = 10 * rate

    while(count--) {
      let url = URL.createObjectURL(bufferToWave(_buffer, offset, block));
      let audio = new Audio(url);
      audio.controls = true;
      audio.volume = 0.75;
      document.body.appendChild(audio);
      offset += block;
    }  
  }

  // Convert the audio-buffer segment to a Blob using WAVE representation
  const bufferToWave = (_buffer, offset, len) => {

    let numOfChan = _buffer.numberOfChannels,
        length = len * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [], i, sample,
        pos = 0;

    // write WAVE header
    setUint32(0x46464952);                         // "RIFF"
    setUint32(length - 8);                         // file length - 8
    setUint32(0x45564157);                         // "WAVE"

    setUint32(0x20746d66);                         // "fmt " chunk
    setUint32(16);                                 // length = 16
    setUint16(1);                                  // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(_buffer.sampleRate);
    setUint32(_buffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2);                      // block-align
    setUint16(16);                                 // 16-bit (hardcoded in this demo)

    setUint32(0x61746164);                         // "data" - chunk
    setUint32(length - pos - 4);                   // chunk length

    // write interleaved data
    for(i = 0; i < _buffer.numberOfChannels; i++)
      channels.push(_buffer.getChannelData(i));

    while(pos < length) {
      for(i = 0; i < numOfChan; i++) {             // interleave channels
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
        view.setInt16(pos, sample, true);          // update data chunk
        pos += 2;
      }
      offset++                                     // next source sample
  }

  // create Blob
  return new Blob([buffer], {type: "audio/wav"});

  function setUint16(data) {
    view.setUint16(pos, data, true);
    pos += 2;
  }

  function setUint32(data) {
    view.setUint32(pos, data, true);
    pos += 4;
  }
  }
}

export default {
  cleanTitleName,
  cleanDate,
  readableName,
  removeSuperfluousDate,
  audioClipper
};
