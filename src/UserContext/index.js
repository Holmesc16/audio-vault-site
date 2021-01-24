import {createContext} from 'react'

const UserContext = createContext({
    username: '',
    email: '',
    token: '',
    created_at: '',
    favorites: []
})

export default UserContext