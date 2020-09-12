import styled from 'styled-components'

export const StyledLogin =  styled.div`
h1 {
  font-family: 'Avenir Next' !important;
}
.login-container, .signup-container {
  font-family: 'Avenir Next' !important;
  display: flex;
  align-items: center;
  background-image: url("./assets/carry-on-colour.svg");
  height: calc(100vh - 70px);
  background-repeat: no-repeat;
  background-position: right;
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 70px;
  justify-content: center;
}
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  height: 70%;
  width: 45%;
  margin: 0 25px;
}
/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
/* Add some padding inside the card container */
.login-container .container {
  padding-left: 7%;
  padding-right: 7%;
  height: 100%;

}
.login-container .container h1{
  font-size: 2.5rem;
}
.login-container .container form{
  display: flex;
  height: 80%;
  flex-direction: column;
  justify-content: space-around;
  align-self: center;
}
input[type="text"] {
  font-family: 'Avenir Next' !important;
}
input[type="text"], input[type="password"]{
  padding-left: 12px;
  padding-right: 12px;
  height: 40px;
  border-radius: 5px;
  border: .5px solid rgb(143, 143, 143);
  font-size: 15px;
}
label{
  display: flex;
  flex-direction: column;
}
.login-container button{
    height: 40px;
    font-weight: 600;
    border: none;
    font-size: 15px;
    font-family: 'Avenir Next';
    background-color: #AB1000;
    color: rgb(255,255,255);

      &:hover, &:focus {
          cursor:pointer;
          background-color:#FF0111;
      }
}

.login-container button:focus{
  outline: none !important;
}


.spinner {
  animation: spinner infinite .9s linear;
  height: 90%;
}
.spinner:focus{
  border:none;
}
@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.form-error{
  color: #F42B4B;
  text-align: center;
}
@media screen and (max-width: 700px){
  .login-container{
    justify-content: center;
    background-image: none;
  }
  .card {
    width: 80%;
    align-self: center;
  }
  
}
@media screen and (max-width: 350px){
  .card {
    width: 100%;
  }
  
}
`