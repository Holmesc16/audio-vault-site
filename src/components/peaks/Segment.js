import React from 'react'
import { StyledSegment } from './styles'

const Segment = props => {
    const { id, startTime, endTime, labelText } = props
    const timeFormat = time => {   
        // Hours, minutes and seconds
        debugger;
        let hrs = ~~(time / 3600);
        let mins = ~~((time % 3600) / 60);
        let secs = ~~time % 60;
      
        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = ""
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "")
        }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "")
        ret += "" + secs;
        return ret
      }
    return (
        <StyledSegment>
            <table id={id}>
                <tr>
                    <td>Segment start: {timeFormat(parseInt(startTime))}</td>
                </tr>
                <tr>
                    <td>Segments end: {timeFormat(parseInt(endTime))}</td>
                </tr>
                <tr>
                    <td>{labelText || ''}</td>
                </tr>
            </table>
        </StyledSegment>
    )
}

export default Segment;