import React from 'react';
import { GlobalStyle } from './ui/AppStyles'
import Home from './views/Home';
import { useFetch } from './utils'

function App() {
  let {response, loading} = useFetch('http://localhost:5000', {})  
  
  return (
      <div className="App">
              <GlobalStyle/>
              <Home audio={response} loading={loading}/>
      </div>
  );
}

export default App;
