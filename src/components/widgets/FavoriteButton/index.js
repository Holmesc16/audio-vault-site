import React, {useState, useEffect} from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const FavoriteButton = withRouter((props) => {
    const [isFavorited, setIsFavorited] = useState(false)
    const [userFavorites, setUserFavorites] = useState([])
    const {file, user, title, date, s3key} = props
    
    const addFav = (props) => {
        let array = userFavorites;
        let addArray = true;
        array.map((item, key) => {
            if(item === props.i) {
                array.splice(key, 1)
                addArray = false
            }
        })
        if(addArray) array.push(props.i)
        setUserFavorites([...array])
        localStorage.setItem('favorites', JSON.stringify(userFavorites))
        let storage = localStorage.getItem(`favorite_${props.i || 0}`)
        if(storage == null) {
            localStorage.setItem(`favorite_${props.i}`, JSON.stringify(props.items))
        } else {
            localStorage.removeItem(`favorite_${props.i}`)
        }
    }

    const addToFavorites = (e, title, user, date, key) => {
        e.preventDefault()
        if(!user) {
            props.history.push('/login', {title, user, date, key})
        } else {
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
        }
    }

    useEffect(() => {
        const getUserFavorites = () => {
            if(user) {
            axios.get(`http://localhost:5000/favorites/${user}`)
            .then(response => {
                const { favorites } = response.data
                if(favorites !== undefined && favorites > 0) {
                    setUserFavorites(prev => [...prev, favorites])
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
