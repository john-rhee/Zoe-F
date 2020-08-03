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


function App() {
  // These two lines are to toggle the Menu options
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  const [mainForm, setMainForm] = useState([]);

    useEffect( () => {
      axiosWithAuth().get('https://zoe-backend.herokuapp.com/todo/')
          .then(response => {
              setMainForm(response.data);
              console.log('app axios get', response.data);
          })
          .catch(error => {
              console.log(error)
          })
          if(!localStorage.getItem('token')) {
              console.error('Not logged in');
          }   else {
              console.info('Logged in.');
          }
  }, []);

  return (
  <WunderContext.Provider value={{mainForm, setMainForm}}>	   
    <Router>
      <div className="App">

        
          <div href="/lists">Zoe's World</div>
          <div onClick={toggle} />
          <div isOpen={isOpen} navbar>
            <div className="mr-auto" navbar>
              <div>
                <Link to='/login' onClick ={() => localStorage.clear()} style={!localStorage.getItem ('token') ? {display: 'none'} : {color: "#313D5A"}}>
                  Log out
                </Link>
              </div>
              <div>
                <div>
                  <Link to='/register' style={!localStorage.getItem('token') ? {color: "#313D5A"} : { display: 'none' }}>
                    Register
                  </Link>
                </div>
              </div>
              <div>
                <div>
                  <Link to='/login' style={!localStorage.getItem('token') ? {color: "#313D5A"} : { display: 'none' }}>
                    Login
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
