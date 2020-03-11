import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle } from './ui/AppStyles'
import Home from './views/Home';
import Header from './components/Header'
import Footer from './components/Footer'
import { useFetch } from './utils'

function App() {
  
  let {response, loading} = useFetch('http://localhost:5000', {})  

  return (
    <div className="App">
      <Router>
        <GlobalStyle/>
          <Header width="200" />
          <Home audio={response} loading={loading}/>
          <Footer/>
      </Router>
    </div>
  );
}

export default App;
