import React from 'react';
import Routes from './Routes'
import { GlobalStyle } from './ui/AppStyles'
import Home from './views/Home';
import Header from './components/Header'
import Footer from './components/Footer'
import { useFetch } from './utils'

function App() {
  
  let {response, loading} = useFetch('http://localhost:5000', {})  

  return (
    <div className="App">
        <GlobalStyle/>
          <Header width="200" />
          <Home audio={response} loading={loading}/>
          <Footer/>
    </div>
  );
}

export default App;
