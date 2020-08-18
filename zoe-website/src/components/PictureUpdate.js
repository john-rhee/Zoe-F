import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from "axios";
import WunderContext from '../contexts/WunderContext';

const PictureUpdate = props => {

    const initialItem = {

      title: "",
      description: "",
      user_id: props.match.params.id
    
    };

    const {mainForm, setMainForm, url, setUrl} = useContext(WunderContext);

    console.log(mainForm)
    console.log(props)
    console.log(props.match.params.id)

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
        console.log("jsonItem file type", item.type)
         
        const fd = new FormData() 
        fd.append("uimage", selectedFile, jsonItem)
        
        axios
            .put(`http://localhost:5000/upload/${mainForm.id}`, fd)
            .then(response => {
                console.log(response);
                
                setUrl(response.data)
                props.history.push(`/lists/${item.user_id}`);
            })
            window.location.reload()

        //resetting Item form
        setItem({ 
            title: "",
            description: "",
            user_id: null
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

    <h2>Update</h2>
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

            <button onClick={fileUploadHandler}>Update</button>

    </div>
  );
};

export default PictureUpdate;