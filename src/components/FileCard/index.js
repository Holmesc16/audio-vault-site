import React from 'react'
import {StyledWrapper} from '../../views/Home/styles'
import { Button, Icon, Item, Label, Loader } from 'semantic-ui-react'
import {cleanTitleName, readableName} from '../../utils'

const FileCard = props => {
 const {date, title, tags } =props.location.state

 return (
     <StyledWrapper>
        <Item>
          <Item.Content>
              <h1>{readableName(cleanTitleName(title))}</h1>
              {/* put media player here */}
              <h2>{date}</h2>
              <Item.Extra className="audio tags-container">
              {tags
              .split(',')
              .map(tag => tag.length ? <Label key={tag} className="audio tag">{tag}</Label> : '')}
              </Item.Extra>
          </Item.Content>
      </Item>
     </StyledWrapper>
   )
}

export default FileCard