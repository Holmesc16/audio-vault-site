import React, {useState, useEffect} from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const FavoriteButton = withRouter((props) => {
    const [isFavorited, setIsFavorited] = useState(false)
    const [userFavorites, setUserFavorites] = useState([])
    const {file, user, title, date, s3key} = props

    const addToFavorites = (e, title, user, date, key) => {
        e.preventDefault()
        if(!user) {
            props.history.push('/login', {title, user, date, key})
        }
        setIsFavorited(!isFavorited)
        axios
        .post('http://localhost:5000/favorites/update/', {
            file,
            user: user.username,
            title,
            userFavorites
        })
        .then(response => {
            return response.data
        })
        .then(favorites => setUserFavorites(prev => [...prev, favorites]))
        .then(() => console.log(userFavorites))
    }

    useEffect(() => {
        const getUserFavorites = () => {
            if(user) {
            axios.get(`http://localhost:5000/favorites/${user}`)
            .then(response => {
                // console.log('favorites! ',response)
                const { favorites } = response.data
                if(favorites !== undefined && favorites > 0) {
                    setUserFavorites(favorites)
                }
            })
        }}
        return () => getUserFavorites()
    }, [userFavorites, isFavorited]
    )
    return (
        <Button onClick={e => addToFavorites(e, title, user, date, s3key)} floated='right' className="favorite" style={{backgroundColor: `${isFavorited ? '#ffcc22' : '#fff' }`, paddingRight: '12px', border: `1px solid ${isFavorited ? '#fff' : '#999'}`}}>
            <Icon name={isFavorited ? 'heart' : 'heart outline'} className="heart" center="true" color={isFavorited ? 'white' : 'red'}/>
        </Button>
    )
})

export default FavoriteButton
