import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import WunderContext from '../contexts/WunderContext';

function SinglePicture(props) {


    // const {id, name} = props.wList;
    const {id, name, title, descript} = props.pList;

    const user_id = props.match.params.id

    const image_id = props.picId.toString()


    const image_url = `https://zoe-backend.herokuapp.com/profile/${name}`

    const {mainForm, setMainForm, url, setUrl, imageId, setImageId} = useContext(WunderContext);

    const deleteList = e => {
        e.preventDefault();
        axiosWithAuth()
        .delete(`https://zoe-backend.herokuapp.com/upload/${id}`,
            //sending image file name
            {params: {file_name: name}}
             )
          .then(res => {
  
            axiosWithAuth()
            .get('https://zoe-backend.herokuapp.com/upload')
            .then(response => {
              setUrl(response.data)});
              props.history.push(`/lists/${user_id}`);
          })
          .catch(error => console.log(error));
          //refreshes the page 
          window.location.reload()
      }

    return (

        <div>

            <img src = {image_url}/>
            {/* <h2>{image_id}</h2> */}
            <h2>{title}</h2>
            <h3>{descript}</h3>

            <button onClick={
                // setImageId(image_id),
                () =>  props.history.push(`/lists/${image_id}/update`,{fileName:name})}>
                Edit
            </button>

            <button onClick={deleteList}>
                Delete
            </button>

            {/* <h3 className='line'>{title}</h3> */}

        </div>    
    )
}

export default SinglePicture