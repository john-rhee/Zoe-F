import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from "axios";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SinglePicture from './SinglePicture';
import WunderContext from '../contexts/WunderContext';
import dPicture from '../images/defaultImage.png';

import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";
const Button = styled(MuiButton)(spacing);

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

    if (url.length < 1) {
        console.log("0 url length", url.length)
        setUrl(dPicture)
    } else {
        console.log("0 > 1 url length", url.length)
        setUrl(url);
    }

    //getting list of images initially
    useEffect( () => {
        axiosWithAuth().get('https://zoe-backend.herokuapp.com/upload/', {
        // axiosWithAuth().get('http://localhost:5000/upload/', {    
            //sending users id
            params: {
              user_id: props.match.params.id
            }
          })
            .then(response => {

                if (response.data.length < 1) {
                    console.log("0 dataset length", response.data.length)
                    setUrl(dPicture)
                } else {
                    console.log("full dataset length", response.data.length)
                    setUrl(response.data);
                }

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
         
        const fd = new FormData() 
        fd.append("uimage", selectedFile, jsonItem)
        
        axiosWithAuth()
            .post('https://zoe-backend.herokuapp.com/upload/', fd)
            // .post('http://localhost:5000/upload/', fd)
            .then(response => {
                console.log("response after posting",response);
                //setUFile(response.data.picture.name)
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

        <div class="allList">
            
            <h2 class="title3">Welcome to Zoe's Album</h2>

            <div>
                 {(() => {
                    if (url == dPicture) {
                        return (
                         <div>
                             <img class="mainImage" src = {url}/>
                         </div>
                        )
                    } else {
                        return (
                         <div class="picture">
                            {url.map(pic => (
                                
                            <div key={pic.id}>
                                <Route render={props => {return <SinglePicture {...props} pList={pic} picId ={pic.id}/>}} />
                        </div>
                            
                            ))}

                         
                            
                         </div>
                        )}   
                })()}
            </div>

            <h3 class="title4">Upload pictures here</h3>
            <h7 class="title5">*Upload only jpeg, jpg, png, gif file under size 5MB</h7>
            
            <input class="margin" type="file" onChange={fileSelectHandler}/>

            {/* for title */}
            <h6>Title</h6>
            <input type="text" name="title" onChange={changeHandler} placeholder="title" value={item.title} />
            {/* for title */}

            {/* for description */}
            <h6>Description</h6>
            <input type="text" name="description" onChange={changeHandler} placeholder="description" value={item.description} />
            {/* for description */}

            <Button my={1.5} variant="contained" color="primary" onClick={fileUploadHandler}>Upload</Button>

            

        </div>
    )
}

export default AllLists