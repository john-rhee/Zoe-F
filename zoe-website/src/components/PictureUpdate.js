import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from "axios";
import WunderContext from '../contexts/WunderContext';

import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";
const Button = styled(MuiButton)(spacing);

const PictureUpdate = props => {

    const {mainForm, setMainForm, url, setUrl, imageId, setImageId, uId, setUId} = useContext(WunderContext);

    const upFileName = props.location.state.fileName

    const initialItem = {

      title: "",
      description: "",
      user_id: uId,
      image_id: props.match.params.id,
      prev_file: upFileName

    };

    console.log(uId)
    console.log(mainForm)
    console.log(props)
    console.log("file name:", props.location.state.fileName)
    console.log(props.match.params.id)
    console.log("image id", imageId)

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
            .put(`https://zoe-backend.herokuapp.com/upload/${uId}`, fd)
            // .put(`http://localhost:5000/upload/${uId}`, fd)
            .then(response => {
                console.log("response after update",response);
                // setUrl(response.data)

                axiosWithAuth()
                    .get('https://zoe-backend.herokuapp.com/upload/', {
                    // .get('http://localhost:5000/upload/', {
                        //sending users id
                        params: {
                        user_id: uId
                        }
                    })
                    .then(response => {
                    console.log("response after update 2",response);
                    setUrl(response.data)
                });
                    props.history.push(`/lists/${uId}`);
            })
            .catch(error => console.log(error));

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
            user_id: uId
            });
    };    

return (

    <div className="allList">

    <h3 className="title4">Update</h3>
    <h7 className="title5">*Upload only jpeg, jpg, png, gif file under size 5MB</h7>
            
            <input className="file" type="file" onChange={fileSelectHandler}/>

            {/* for title */}
            <h6>Title</h6>
            <input type="text" name="title" onChange={changeHandler} placeholder="title" value={item.title} />

            {/* for description */}
            <h6>Description</h6>
            <input type="text" name="description" onChange={changeHandler} placeholder="description" value={item.description} />
           
            <Button my={1.5} variant="contained" color="primary" onClick={fileUploadHandler}>Update</Button>
           

    </div>
  );
};

export default PictureUpdate;