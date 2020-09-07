import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from "axios";
import WunderContext from '../contexts/WunderContext';

import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";
const Button = styled(MuiButton)(spacing);


const Login = props =>{

  const {mainForm, setMainForm} = useContext(WunderContext);  

  const [state, setState] = useState({
    credentials: {
      username: '',
      password: ''
    },
    isLoggedIn: false
  });  

  const handleChange = e => {
      setState({
        credentials: {
          ...state.credentials,
          [e.target.name]: e.target.value
        }
      });
    };

  const loginEvent = event => {
      event.preventDefault();
      axios.post('https://zoe-backend.herokuapp.com/users/login', state.credentials)
      // axios.post('http://localhost:5000/users/login', state.credentials)
      .then(response => {
          console.log("check here", response);

          const user_ID = response.data.user_id
          console.log("user id here", response.data.user_id);

          const { data } = response;

          localStorage.setItem("token", data.token);
          setState({ ...state, isLoggedIn: true });

          

          axiosWithAuth().get('https://zoe-backend.herokuapp.com/upload/', {
          // axiosWithAuth().get('http://localhost:5000/upload/', {
            //sending users id
            params: {
              user_id: user_ID
            }
          })
          .then(response => {
            setMainForm(response.data)});

          props.history.push(`/lists/${user_ID}`);
      })
  }

  return (
    <div class="loginForm">

      <form onSubmit={loginEvent}>
        <h2>{state.isLoggedIn ? "Logged In" : "Login"}</h2>

                <div class="loginForm2">
        
                <input class="loginForm3" type="text" name="username" id="username" placeholder="Username" value={state.credentials.username} onChange={handleChange} />
            
                <input class="loginForm3" type="password" name="password" id="password" placeholder="Password" value={state.credentials.password} onChange={handleChange} />
            
                </div>

                <Button my={1} ml={1.5} mr={1.5} variant="contained" color="primary" type="submit">Log In</Button>
            
                
        </form>

    </div>
  );

}  

export default Login;