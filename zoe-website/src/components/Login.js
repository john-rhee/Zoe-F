import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from "axios";
import WunderContext from '../contexts/WunderContext';


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
      .then(response => {
          console.log("check here", response);
          const { data } = response;

          localStorage.setItem("token", data.token);
          setState({ ...state, isLoggedIn: true });

          axiosWithAuth().get('https://zoe-backend.herokuapp.com/upload', {
            //sending users id
            params: {
              user_id: response.data.user_id
            }
          })
          .then(response => {
            setMainForm(response.data)});

          props.history.push(`/lists/${response.data.user_id}`);
      })
  }

  return (
    <div>

      <form onSubmit={loginEvent}>
        <h2>{state.isLoggedIn ? "Logged In" : "Please login"}</h2>
        
                <input type="text" name="username" id="username" placeholder="Username" value={state.credentials.username} onChange={handleChange} />
            
                <input type="password" name="password" id="password" placeholder="Password" value={state.credentials.password} onChange={handleChange} />
            
                <button type="submit">Log In</button>
            
        </form>

    </div>
  );

}  

export default Login;