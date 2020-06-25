import React, { useContext, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from './App'
import Header from './components/Header'
import Footer from './components/Footer'
import FileCard from './components/FileCard'
import SearchResults from './components/SearchResults'
import Tags from './components/Tags'
import Login from './views/Login'
export const AuthContext = React.createContext()

const initState = {
  isAuthenticated: false,
  user: null,
  token: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

const Routes = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <Router>
      <AuthContext.Provider value={{state, dispatch}}>
      <Header width="200" />
      <Footer/>
      <Route exact path="/" component={App}/>
      <Route exact path="/audio" component={App}/>
      <Route exact path="/search/:keyword" component={SearchResults} />
      <Route path="/login" component={Login} />
      {/* 
      <Route path="/about" component={About} /> 
      */}
      <Route path="/tags/:tag" component={Tags} />
      <Route path="/file/:name" component={FileCard}/>
      </AuthContext.Provider>
    </Router>
  ) 
};

export default Routes