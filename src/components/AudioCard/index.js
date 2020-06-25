import React, {useState, useEffect} from 'react'
import StyledCard from './styles'
import { Button, Icon, Item, Label, Loader } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { cleanTitleName } from '../../utils'
import axios from 'axios'

const cleanTagName = tag => tag.replace('https: www.theunticket.com ', '').replace('tag', '').trim()

const AudioCard = React.memo(function AudioCard(props) {
    const [index, setIndex] = useState(0)
    const [currentChunk, setCurrentChunk] = useState(props.audio[index]) //props.index
    const [taggedAudio, setTaggedAudio] = useState([])
    const [tag, setTag] = useState(null)

    useEffect(() => {
        const infiniteScroll = () => {
                setCurrentChunk(() => currentChunk.concat(props.audio[index]))
                let wrapper = document.querySelector('.audio-wrapper')
                let scrollDiff = wrapper.offsetHeight - window.scrollY
                if(scrollDiff < 600) {
                    let newIndex = index + 1
                    setIndex(newIndex)
                    setCurrentChunk(() => currentChunk.concat(props.audio[index]))
                    console.log('currentChunk',currentChunk)
                }
        }
        window.addEventListener('scroll', infiniteScroll)
        return () => window.removeEventListener('scroll', infiniteScroll)
    }, [index, props.audio])

    const handleTagClick = e => {
        const tagName = e.target.innerText
        setTag(tagName)
        axios.get(`http://localhost:5000/tags/${tagName}`)
            .then(response => response.data)
            .then(tags => setTaggedAudio(tags))
            .then(() => console.log(taggedAudio))
    }
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
            { tag !== null && taggedAudio.length > 0 &&
          <Redirect to={{
            pathname: `/tags/${tag}`,
            state: {
              from: '/',
              tagName: tag,
              taggedAudio: taggedAudio
            }
          }} />
        }
        </StyledCard>
    )
})

export default AudioCard