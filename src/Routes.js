import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import App from './App'
import FileCard from './components/FileCard'

const Routes = () => (
    <Router>
      <Route exact path="/" component={App}/>
      <Route exact path="/audio" component={App}/>
      <Route path="/file/:name" component={FileCard}/>
    </Router>
);

export default Routes