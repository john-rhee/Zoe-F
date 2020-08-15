import React from 'react';

function SinglePicture(props) {
    // const {id, name} = props.wList;
    const {id, name, title, descript} = props.pList;

    return (

        <div>

            <img src = {name}/>
            <h2>{title}</h2>
            <h3>{descript}</h3>

            <button onClick={() => props.history.push(`/lists/${id}/update`)}>
                Edit
            </button>

            {/* <h3 className='line'>{title}</h3> */}

        </div>    
    )
}

export default SinglePicture