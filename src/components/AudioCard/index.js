import React, {useState, useEffect, useContext} from 'react'
import StyledCard from './styles'
import { Button, Icon, Item, Label, Loader } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../UserContext'
import { withRouter } from 'react-router-dom'

const cleanTagName = tag => tag.replace('https: www.theunticket.com ', '').replace('tag', '').trim()

const AudioCard = withRouter((props) => {
    const [index, setIndex] = useState(0)
    const [currentChunk, setCurrentChunk] = useState(props.audio[index]) //props.index
    const [taggedAudio, setTaggedAudio] = useState([])
    const [tag, setTag] = useState(null)
    const {user, setUser} = useContext(UserContext)
    const [userFavorites, setUserFavorites] = useState(user?.favorites ? JSON.parse(user.favorites) : [])

    const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites') || 0);

    useEffect(() => {
        if(favoritesFromLocalStorage !== 0) {
            setUserFavorites([...favoritesFromLocalStorage])
        }
    }, [user]) // NEW: add user to dep array. Is this causing the maximum depth err? 

    useEffect(() => {
        const infiniteScroll = () => {
                setCurrentChunk(() => currentChunk.concat(props.audio[index]))
                let wrapper = document.querySelector('.audio-wrapper')
                let scrollDiff = wrapper.offsetHeight - window.scrollY
                if(scrollDiff < 1200) {
                    let newIndex = index + 1
                    setIndex(newIndex)
                    setCurrentChunk(() => currentChunk.concat(props.audio[index]))
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
    }

    const toggleFavorite = (e, {index, name}) => {
        e.preventDefault()
        if(!user) {
            props.history.push('/login', {user})
        } else {
        let array = userFavorites;
        let addArray = true;
        array.map((item, $i) => {
            if(item.name === name) {
                array.splice($i, 1)
                addArray = false
            }
        })
        if(addArray) array.push({name, index})
        setUserFavorites([...array])
        localStorage.setItem('favorites', JSON.stringify(userFavorites))
        axios.post(`http://localhost:5000/favorites/put`, {
            user,
            userFavorites: JSON.stringify(userFavorites)
        })
        let storage = localStorage.getItem(`favorite_${name || 0}`)
        if(storage == null) {
            localStorage.setItem(`favorite_${name}`, JSON.stringify({name, index}))
        } else {
            localStorage.removeItem(`favorite_${name}`)
        }
    }
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
                                <Item.Header className="audio header">{item.audio_title ? item.audio_title : 'Hmm... There\'s No Title For This'}</Item.Header>
                                <Item.Meta className="audio date">{item.audio_date}</Item.Meta>
                                <Item.Extra className="audio tags-container">
                                {item.audio_tags
                                .split(',')
                                .map(tag => tag.length ? <Label key={tag} className="audio tag" onClick={e => handleTagClick(e)}>{cleanTagName(tag)}</Label> : '')}
                                </Item.Extra>
                                    <Button onClick={e => toggleFavorite(e, {index, name: item.s3_key})} floated='right' className="favorite" style={{backgroundColor: `${userFavorites.filter(obj => obj.name === item.s3_key).length ? '#ffcc22' : '#fff' }`, paddingRight: '12px', border: `1px solid ${userFavorites.filter(obj => obj.name === item.s3_key).length ? '#fff' : '#999'}`}}>
                                        <Icon name={userFavorites.filter(obj => obj.name === item.s3_key).length ? 'heart' : 'heart outline'} className="heart" center="true" color={userFavorites.filter(obj => obj.name === item.s3_key).length ? 'white' : 'red'}/>
                                    </Button>
                                    
                                    <Link to={{pathname:`/file/${item.s3_key}`, state: { title: item.audio_title, tags: item.audio_tags, date: item.audio_date, key:item.s3_key } }}>
                                        <Button floated='right' className="play-button">
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