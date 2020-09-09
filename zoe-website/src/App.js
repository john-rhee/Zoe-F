import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { axiosWithAuth } from './utils/axiosWithAuth';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AllLists from './components/AllLists';
import WunderContext from './contexts/WunderContext';
import PrivateRoute from "./components/PrivateRoute";
import PictureUpdate from './components/PictureUpdate';
import dPicture from './images/defaultImage.png';
import hPicture from './images/bg2.jpg';

import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";
const Button = styled(MuiButton)(spacing);


function App() {

  const initialId = ""

  const [mainForm, setMainForm] = useState([]);
  const [url, setUrl] = useState(dPicture);
  const [uId, setUId] = useState(initialId)

  //image id//
  const [imageId, setImageId] = useState(null);

  console.log("starting items", url)
 
  return (
  <WunderContext.Provider value={{mainForm, setMainForm, url, setUrl, imageId, setImageId, uId, setUId}}>	   
    <Router>
      <div className="App">

          <div>
            <div class="dash">

              <h1 class="title" >Zoe's Album</h1>

              <div class="navButton">

                <div class="oButton">
                  <Link to='/login' onClick ={() => localStorage.clear()} style={!localStorage.getItem ('token') ? {display: 'none'} : {color: "#313D5A"}}>
                  <Button my={3} ml={2} variant="contained" color="primary" onClick ={() => window.location.reload(true)}>Log out</Button>
                  </Link>
                </div>
                
                <div class="rButton">
                  <Link to='/register' style={!localStorage.getItem('token') ? {color: "#313D5A"} : { display: 'none' }}>
                  <Button my={3} mx={0.5} variant="contained" color="primary">Register</Button>
                  </Link>
                </div>
                
                <div class="lButton">
                  <Link to='/login' style={!localStorage.getItem('token') ? {color: "#313D5A"} : { display: 'none' }}>
                  <Button my={3} mx={0.5} variant="contained" color="primary">Login</Button>
                  </Link>
                </div>

              </div>
              
            </div>
         
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />

            <img class="mainImage" src = {hPicture}/>

        </div>

        </div>
        
          
          <PrivateRoute exact path="/lists/:id" component={AllLists}/>
          <Route
            path="/lists/:id/update"
            render={props => {
            return <PictureUpdate {...props}/>
            }}  
            />            
        
    </Router>
  </WunderContext.Provider>    
  );
}


export default App;