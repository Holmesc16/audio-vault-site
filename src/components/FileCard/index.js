import React from 'react'
import {StyledWrapper} from '../../views/Home/styles'
import { Button, Icon, Item, Label, Loader } from 'semantic-ui-react'
// import {cleanTitleName, readableName} from '../../utils'
import { useFetch } from '../../utils'
import Spinner from '../../components/Spinner'

const FileCard = props => {
 const { date, title, tags } =props.location.state
 const { response, loading } = useFetch(`http://localhost:5000/file/${title}`)
 
 return (
    
     <StyledWrapper>
      { loading ? <Spinner/> :
        <Item>
          <Item.Content>
              <h1>{response.title}</h1>
              {/* put media player here */}
              <h2>{response.date}</h2>
              <Item.Extra className="audio tags-container">
              {response.tags
              .split(',')
              .map(tag => tag.length ? <Label key={tag} className="audio tag">{tag}</Label> : '')}
              </Item.Extra>
          </Item.Content>
        </Item>
      }
     </StyledWrapper>
   )
}

export default FileCard