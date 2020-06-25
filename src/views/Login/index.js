import React, { useState, useContext } from "react";
import { AuthContext } from "../../App";
import { StyledLogin } from './styles'

export const Login = () => {
  const { dispatch } = useContext(AuthContext)

  const initState = {
    email: '',
    userName: '',
    password: '',
    isSubmitting: false,
    errMessage: null
  }
  const [userData, setUserData] = useState(initState)

  const handleInputChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.name
    })
  }
  return (
  <StyledLogin>
  <div className="login-container">
  <div className="card">
    <div className="container">
      <form>
        <h1>P1 Login</h1>
  
    <label htmlFor="email">
          Email Address
          <input
            type="text"
            value={userData.email}
            onChange={handleInputChange}
            name="email"
            id="email"
          />
        </label>
  
    <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            id="password"
          />
        </label>
    {userData.errMessage && (
      <span className="form-error">{userData.errMessage}</span>
    )}

    <button disabled={userData.isSubmitting}>
            {userData.isSubmitting ? "Loading" : "Login"}
        </button>
      
    </form>
    </div>
  </div>
  </div>
</StyledLogin>
  );
};
export default Login;