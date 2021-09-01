import React from 'react'
import { StyledSegment } from './styles'
import { Table, Button, Icon } from 'semantic-ui-react'

const Segment = props => {
    console.log(props)
    const { url, id, startTime, endTime, labelText, segmentDate, selectedTags, user, segmentDescription, removeSegment, postAudioClip } = props
    const timeFormat = time => {   
        // Hours, minutes and seconds
        // debugger;
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
      const handleRemoveSegment = e => {
          return removeSegment()
      }
    return (
        <div id="segment" style={{ display: 'flex' }}>
            <Table celled style={{ marginTop: 0, marginBottom: 0, marginRight: '12px' }}>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Segment name</Table.HeaderCell>
                    <Table.HeaderCell>Start Time</Table.HeaderCell>
                    <Table.HeaderCell>End Time</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        {labelText}
                    </Table.Cell>
                    <Table.Cell>
                        {timeFormat(startTime)}
                    </Table.Cell>
                    <Table.Cell>
                        {timeFormat(endTime)}
                    </Table.Cell>
                </Table.Row>
                </Table.Body>
        </Table>
        <Button onClick={postAudioClip(url, labelText, segmentDescription, selectedTags, segmentDate, startTime, endTime, user)} icon labelPosition="left" style={{backgroundColor: 'rgba(36,30,227,0.9)', color: '#fff', height: 'fit-content'}}>
            <Icon name="check" />
            Publish
        </Button>
        <Button onClick={e => handleRemoveSegment(e)} icon negative labelPosition='left' style={{height: 'fit-content'}}>
            <Icon name='cancel' />
            Cancel
        </Button>
      </div>
    )
}

export default Segment;