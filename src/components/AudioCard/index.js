import React from 'react'
import StyledCard from './styles'
import { Button, Icon, Item, Label, Loader } from 'semantic-ui-react'
import { useScrollTop } from '../../utils'
import FileCard from '../FileCard'
import { Link, Switch } from 'react-router-dom'

const cleanTagName = tag => tag.replace('https: www.theunticket.com ', '').replace('tag', '').trim()

 const AudioCard = React.memo(function AudioCard(props) {
    
    let currentChunk = props.audio[props.index]
    console.log(currentChunk)
   return (
        <StyledCard>
            <div>
                <Item.Group divided>
                {props.audio && currentChunk ? 
                    currentChunk
                    .map((item, index) => {
                        return (
                        <Item key={index}>
                            <Item.Content>
                                <Item.Header className="audio header">{item.title.replace(/_/g, ' ')}</Item.Header>
                                <Item.Meta className="audio date">{item.date}</Item.Meta>
                                <Item.Extra className="audio tags-container">
                                {item.tags
                                .split(',')
                                .map(tag => tag.length ? <Label key={tag} className="audio tag">{cleanTagName(tag)}</Label> : '')}
                                </Item.Extra>
                                <Link to={`/file/${item.title}`}>
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
        </StyledCard>
    )
})

export default AudioCard