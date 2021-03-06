import React, { useMemo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App'
import Header from './components/Header'
import Footer from './components/Footer'
import FileCard from './components/FileCard'
import SearchResults from './components/SearchResults'
import Tags from './components/Tags'
import Login from './views/Login'
import UserContext from './UserContext'
import About from './views/About'
import ClipCard from './components/ClipCard'

const Routes = () => {
  const [user, setUser] = useState(null)
  const userProviderValue = useMemo(() => ({user, setUser}), [user, setUser])
  
  useEffect(() => {
    let existingUser = localStorage.getItem('user')
    if(existingUser !== null) {
      const {username, email, token, created_at, favorites} = JSON.parse(existingUser)
      setUser(() => ({username, email, token, created_at, favorites}))
    }
  }, [])

  return (
    <Router>
      <UserContext.Provider value={userProviderValue}>
      <Header width="200" />
      <Footer/>
      <Route exact path="/" component={App}/>
      <Route exact path="/audio" component={App}/>
      <Route exact path="/search/:keyword" component={SearchResults} />
      <Route path="/login" component={Login} />
      <Route path="/about" component={About} /> 
      <Route path="/tags/:tag" component={Tags} />
      <Route path="/file/:name" component={FileCard}/>
      <Route path="/clip" component={ClipCard} />
      </UserContext.Provider>
    </Router>
  ) 
};

export default Routes