import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from "axios";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SingleList from './SingleList';
import WunderContext from '../contexts/WunderContext';
import dPicture from '../images/defaultImage.png';

const initialItem = {

    name: ""
    
};

function AllLists() {

    const {mainForm, setMainForm} = useContext(WunderContext);
    //uploaded picture//
    const [uFile, setUFile] = useState("none");
    const [url, setUrl] = useState(dPicture);

    //picture//
    const [selectedFile, setSelectedFile] = useState(null);
    
    //picture//
    const fileSelectHandler = event => {
        setSelectedFile(event.target.files[0])
    }
    //picture//
    const fileUploadHandler = event => {
        console.log("upload started")
        const fd = new FormData() 
        fd.append("uimage", selectedFile, selectedFile.name)
        axios
            .post('https://zoe-backend.herokuapp.com/upload', fd)
            .then(response => {
                console.log(response);
                setUFile(response.data.picture.name)
                setUrl(response.data.url)
               
            })
    }
        
    return (

        <div>
            <div>
            <h2>Welcome to Zoe's Album</h2>
            <h3>Lists</h3>

            <Link to="/search">
            <button>Search Tasks</button>
            </Link>
            </div>

            <div>

            {mainForm.map(todo => (
                <div 
                key={todo.id}
                >
                    <Route render={props => {return <SingleList {...props} wList={todo} />}} />
                </div>
            ))}
            </div>

            {/* picture */}
            <div>
            <h3>Pictures</h3>
            <h6>Upload picture</h6>
            <img src={url}/>
            <h6>*Upload only jpeg, jpg, png, gif file under size 5MB</h6>
            <input type="file" onChange={fileSelectHandler}/>
            <button onClick={fileUploadHandler}>Upload</button>
            </div>

        </div>
    )
}

export default AllLists