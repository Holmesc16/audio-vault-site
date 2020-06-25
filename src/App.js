import React, {useReducer, useContext} from 'react';
import { GlobalStyle } from './ui/AppStyles'
import Home from './views/Home';
import Login from './views/Login'
import { useFetch } from './utils'
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

function App() {
  let {response, loading} = useFetch('http://localhost:5000', {})  
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      <div className="App">
              <GlobalStyle/>
              <Home audio={response} loading={loading}/>
              {/* {!state.isAuthenticated ? <Login /> : <Home audio={response} loading={loading}/>} */}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
