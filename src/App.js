import React, { useEffect } from 'react';
import { GlobalStyle } from './ui/AppStyles'
import Home from './views/Home';
import { useFetch } from './utils'
const localdata = require('./dummy.json')

function App() {
  // @ NOTE: commenting out destructure of data and loading for testing / sharing
  // let {response, loading} = useFetch('http://localhost:5000', {})  
  const response = localdata
  const loading = response.length ? false : true
  console.log(response)
  return (
      <div className="App">
              <GlobalStyle/>
              <Home audio={response} loading={loading}/>
      </div>
  );
}

export default App;
