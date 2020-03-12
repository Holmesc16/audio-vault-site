import React from 'react'
import {StyledWrapper} from '../../views/Home/styles'
import cleanTitleName from '../../utils'

const FileCard = props => {
 const {date, title, tags } =props.location.state

 return (
     <StyledWrapper>
       <h1>{title}</h1>
     </StyledWrapper>
   )
}

export default FileCard