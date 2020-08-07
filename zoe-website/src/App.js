import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { axiosWithAuth } from './utils/axiosWithAuth';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Update from './components/Update';
import Search from './components/Search';
import AllLists from './components/AllLists';
import WunderContext from './contexts/WunderContext';
import PrivateRoute from "./components/PrivateRoute";

import zoepic from "./images/zoepic.jpeg";


function App() {

  const [mainForm, setMainForm] = useState([]);
 
  return (
  <WunderContext.Provider value={{mainForm, setMainForm}}>	   
    <Router>
      <div className="App">

        
          <div href="/lists">Zoe's World</div>
          <img src={zoepic}/>
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
          <Route path='/search' component={Search} />
          <PrivateRoute exact path="/lists" component={AllLists}/>
          <Route
            path="/update/:id"
            render={props => {
            return <Update {...props}/>
            }}  
            /> 
        
    </Router>
  </WunderContext.Provider>    
  );
}


export default App;
