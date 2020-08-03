import React from 'react';

function SingleList(props) {
    const {id, name} = props.wList;

    return (

        <div>

            <h2 className='line'>{name}</h2>
            {/* <h3>Completed: {completed}</h3> */}
            <button onClick={() => props.history.push(`/update/${id}`)}>
                Edit
            </button>

        </div>    
    )
}

export default SingleList