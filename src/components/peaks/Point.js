import React from 'react'
import { StyledPoint } from './styles'

const Point = props => {
    const { id, time, labelText } = props
    return (
        <StyledPoint>
          <td>{id}</td>
          <td>{time}</td>
          <td>{labelText}</td>
      </StyledPoint>
    )
}

export default Point;