import React, { useState, useContext } from "react";
import { StyledLogin } from './styles'
import { withRouter } from 'react-router-dom'
import UserContext from '../../UserContext'
import axios from 'axios'

export const Login = props => {

  const {user, setUser} = useContext(UserContext)

  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [showLogin, setShowLogin] = useState(true)
  const [error, setError] = useState('')

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePasswordConfirm = (e) => {
    const passwordConfirm = e.target.value;
    setPasswordConfirm(passwordConfirm);
  };

  const onChangeEmailAddress = (e) => {
    const emailAddress = e.target.value;
    setEmailAddress(emailAddress);
  };

  const handleSignin = (e, username, password) => {
    e.preventDefault()
    return axios
    .post('http://localhost:5000/signin', {
        username,
        password,
      })
      .then((response) => {
        let {username, email, token, created_at} = response.data
        if (token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser(() => ({username, email, token, created_at}))
        }
      })
      .then(() => props.history.push('/'))
      .catch(err => {
        setError(() => ({err}))
      })
  };

  const handleSignup = (e, username, emailAddress, password) => {
    e.preventDefault()
    return axios
    .post('http://localhost:5000/signup', {
        username,
        emailAddress,
        password,
      })
      .then((response) => {
        const {username, email, token, created_at} = response.data
        if (token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser(() => ({username, email, token, created_at}))
        }
      })
      .then(() => props.history.push('/'))
      .catch(err => {
        setError(() => ({err}))
      })
  };

  return (
  <StyledLogin>
  <div className="login-container">
    {showLogin ? 
    <div className="card login">
      <div className="container">
        <form>
          <h1>P1 Sign-in</h1>
    
      <label htmlFor="username">
            Username
            <input
               type="text"
                id="username"
                name="username"
                value={username}
                onChange={e => onChangeUsername(e)}
            />
          </label>
    
      <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => onChangePassword(e)}
              id="password"
            />
          </label>
          <div>
        <a
          style={{cursor: 'pointer'}}
          onClick={() => setShowLogin(false)} 
        >
          Need an account? Sign up here
        </a>
      </div>

      <button
      onClick={e => handleSignin(e, username, password)}
      >
        Sign in
          </button>
        
      </form>
      </div>
    </div>
    :
  <div className="card signup">
      <div className="container">
        <form>
          <h1>P1 Signup</h1>
      <label htmlFor="email">
            Email Address
            <input
              type="text"
              name="email"
              value={emailAddress}
              onChange={e => onChangeEmailAddress(e)}
              id="email"
            />
          </label>

          <label htmlFor="username">
            Username
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={e => onChangeUsername(e)}
            />
          </label>

      <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => onChangePassword(e)}
              id="password"
            />
      </label>
      <label htmlFor="password-confirm">
            Confirm Password
            <input
              type="password"
              name="password"
              value={passwordConfirm}
              onChange={e => onChangePasswordConfirm(e)}
              id="password-confirm"
            />
      </label>
      <div style={{cursor: 'pointer', margin: '12px 0'}}>
        <a
          onClick={()=> setShowLogin(true)} 
        >
          Have an account? Login here
        </a>
      </div>
      {/* {userData.errMessage && (
        <span className="form-error">{userData.errMessage}</span>
      )} */}

        <button
          onClick={e => handleSignup(e, username, emailAddress, password)}
        >
              Signup
        </button>
      </form>
      </div>
    </div>}
  </div>
</StyledLogin>
  );
};
export default withRouter(Login);