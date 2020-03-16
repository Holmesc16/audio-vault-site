import {useState, useEffect, useCallback} from 'react'
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
  // name = cleanTitleName(name)
  // let substr = name.substr(-7)
  // name = name.replace(substr, '')
  // name += cleanDate(substr)
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

export default {cleanTitleName, cleanDate, readableName, removeSuperfluousDate}