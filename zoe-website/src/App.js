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
import hPicture from './images/zoeHome.jpg';


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

          <img src = {hPicture}/>
          <div/>
          <div>
            <div>
              <div>
                <Link to='/login' onClick ={() => localStorage.clear()} style={!localStorage.getItem ('token') ? {display: 'none'} : {color: "#313D5A"}}>
                <button onClick ={() => window.location.reload(true)}>Log out</button>
                </Link>
              </div>
              <div>
                <div>
                  <Link to='/register' style={!localStorage.getItem('token') ? {color: "#313D5A"} : { display: 'none' }}>
                  <button>Register</button>
                  </Link>
                </div>
              </div>
              <div>
                <div>
                  <Link to='/login' style={!localStorage.getItem('token') ? {color: "#313D5A"} : { display: 'none' }}>
                  <button>Login</button>
                  </Link>
                </div>
              </div>
            </div>
         
        </div>

        </div>
        
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
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
