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
import zoepic from "./images/zoepic.jpeg";


function App() {

  const initialId = ""

  const [mainForm, setMainForm] = useState([]);
  const [url, setUrl] = useState(dPicture);
  const [uId, setUId] = useState(initialId)

  //image id//
  const [imageId, setImageId] = useState(null);

  // useEffect( () => {
  //   axiosWithAuth().get('http://localhost:5000/upload')
  //       .then(response => {
  //           setUrl(response.data);
  //           console.log('app axios get', response.data);
  //       })
  //       .catch(error => {
  //           console.log(error)
  //       })
  //       if(!localStorage.getItem('token')) {
  //           console.error('Not logged in');
  //       }   else {
  //           console.info('Logged in.');
  //       }
  // }, []);

  console.log("starting items", url)
 
  return (
  <WunderContext.Provider value={{mainForm, setMainForm, url, setUrl, imageId, setImageId, uId, setUId}}>	   
    <Router>
      <div className="App">

        
          <div href="/lists">Zoe's Album</div>
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
