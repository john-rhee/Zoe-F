import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from "axios";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SinglePicture from './SinglePicture';
import WunderContext from '../contexts/WunderContext';
import dPicture from '../images/defaultImage.png';

// http://localhost:5000/
// https://zoe-backend.herokuapp.com/

function AllLists(props) {

    const initialItem = {

        title: "",
        description: "",
        user_id: props.match.params.id,
        image_id: ""
       
    };
    

    console.log("here is the id",props.match.params.id)

    const {mainForm, setMainForm, url, setUrl, uId, setUId} = useContext(WunderContext);

    setUId(props.match.params.id)

    console.log("starting items", url)

    //getting list of images initially
    useEffect( () => {
        axiosWithAuth().get('https://zoe-backend.herokuapp.com/upload/', {
            //sending users id
            params: {
              user_id: props.match.params.id
            }
          })
            .then(response => {
                setUrl(response.data);
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
    
    //uploaded picture//
    const [uFile, setUFile] = useState("none");
    // const [url, setUrl] = useState(dPicture);
    const [item, setItem] = useState(initialItem)
    console.log("initialItem", initialItem)

    //picture//
    const [selectedFile, setSelectedFile] = useState(null);
    
    //picture//
    const fileSelectHandler = event => {
        setSelectedFile(event.target.files[0])
    }
    //picture//
    const fileUploadHandler = event => {
        console.log("upload started")

        console.log("before json", item)

        //json the items//
        var jsonItem = JSON.stringify(item)

        console.log("title, description, user id uploaded", jsonItem)
        console.log("jsonItem file type", item.type)
         
        const fd = new FormData() 
        fd.append("uimage", selectedFile, jsonItem)
        
        axios
            .post('https://zoe-backend.herokuapp.com/upload/', fd)
            .then(response => {
                console.log(response);
                // setUFile(response.data.picture.name)
                setUrl(response.data)
               
            })

        //resetting Item form
        setItem({ 
            title: "",
            description: "",
            user_id: null,
            image_id: ""
        });    
    }

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;

        setItem({
            ...item,
            [e.target.name]: value,
            user_id: props.match.params.id
            });
    };
        
    return (

        <div>
            <div>
            <h2>Welcome to Zoe's Album</h2>
            </div>

            {/* picture */}
            <div>
            <h3>Pictures</h3>
            <h6>Upload picture</h6>

            <div>
                 {(() => {
                    if (url == dPicture) {
                        return (
                         <div>
                             <img src = {url}/>
                         </div>
                        )
                    } else {
                        return (
                         <div>
                            {url.map(pic => (
                                
                            <div key={pic.id}>
                                <Route render={props => {return <SinglePicture {...props} pList={pic} picId ={pic.id}/>}} />
                        </div>
                            
                            ))}

                         
                            
                         </div>
                        )}   
                })()}
            </div>

            {/* <div>
            {url.map(pic => (
                <div 
                key={pic.id}
                >
                <img src={`https://zoe-backend.herokuapp.com/profile/${pic.name}`}/>
                </div>
            ))}
            </div> */}

            <h6>*Upload only jpeg, jpg, png, gif file under size 5MB</h6>
            
            <input type="file" onChange={fileSelectHandler}/>

            {/* for title */}
            <h6>Title</h6>
            <input type="text" name="title" onChange={changeHandler} placeholder="title" value={item.title} />
            {/* for title */}

            {/* for description */}
            <h6>Description</h6>
            <input type="text" name="description" onChange={changeHandler} placeholder="description" value={item.description} />
            {/* for description */}

            <button onClick={fileUploadHandler}>Upload</button>

            </div>

            {/* <form onSubmit={addHandleSubmit}>
                
            <input type="text" name="name" onChange={changeHandler} placeholder="name" value={wunder.name} />

            <button>Add</button>
            
            </form> */}

        </div>
    )
}

export default AllLists