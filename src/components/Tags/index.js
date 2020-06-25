import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Redirect } from "react-router";
import { Loader, Item, Button, Icon, Label} from 'semantic-ui-react'
import StyledCard from '../AudioCard/styles'
import { StyledWrapper } from "../../views/Home/styles";
import { cleanTitleName } from '../../utils'
import axios from 'axios'

const cleanTagName = tag => tag.replace('https: www.theunticket.com ', '').replace('tag', '').trim()

// import { StyledContainer } from './styles'

const Tags = props => {
    // const {taggedAudio, tagName} = props.location.state
    const [taggedAudio, setTaggedAudio] = useState(props.location.state.taggedAudio)
    const [tagName, setTagName] = useState(props.location.state.tagName)

    const handleTagClick = e => {
        const tagName = e.target.innerText
        setTagName(tagName)
        axios.get(`http://localhost:5000/tags/${tagName}`)
            .then(response => response.data)
            .then(tags => setTaggedAudio(tags))
            .then(() => console.log(taggedAudio))
    }
    return (
        <StyledWrapper>
            <h1>{tagName ? <Label key={tagName} className="feature-tag tag" >{tagName}</Label> : ''}</h1>
            <StyledCard>
            <div>
                <Item.Group divided>
                {taggedAudio ? taggedAudio
                    .map((item, index) => {
                        return (
                        <Item key={index}>
                            <Item.Content>
                                <Item.Header className="audio header">{cleanTitleName(item.title).replace(/\d/g, "")}</Item.Header>
                                <Item.Meta className="audio date">{item.date}</Item.Meta>
                                <Item.Extra className="audio tags-container">
                                {item.tags
                                .split(',')
                                .map(tag => tag.length ? <Label key={tag} className="audio tag" onClick={e => handleTagClick(e)}>{cleanTagName(tag)}</Label> : '')}
                                </Item.Extra>
                                    <Link to={{pathname:`/file/${item.title}`, state: { title: item.title, tags: item.tags, date: item.date } }}>
                                        <Button floated='right' className="">
                                            Listen&nbsp;
                                            <Icon name='play right small'/>
                                        </Button>
                                    </Link>
                            </Item.Content>
                        </Item>
                        )
                 }) : <Loader size="medium">Loading...</Loader>
                 }
                </Item.Group>
            </div>
            { tagName !== props.location.state.tagName && taggedAudio.length > 0 &&
          <Redirect to={{
            pathname: `/tags/${tagName}`,
            state: {
              from: '/',
              tagName: tagName,
              taggedAudio: taggedAudio
            }
          }} />
        }
        </StyledCard>
        </StyledWrapper>
    )
} 

export default Tags