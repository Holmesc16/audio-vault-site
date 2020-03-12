import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from './App'
import Header from './components/Header'
import Footer from './components/Footer'
import FileCard from './components/FileCard'

const Routes = () => (
    <Router>
      <Header width="200" />
      <Footer/>
      <Route exact path="/" component={App}/>
      <Route exact path="/audio" component={App}/>
      {/* 
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} /> 
      <Route path="/tags/:tag" component={Tags} />
      */}
      <Route path="/file/:name" component={FileCard}/>
    </Router>
);

export default Routes