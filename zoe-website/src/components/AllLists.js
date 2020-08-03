import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SingleList from './SingleList';
import WunderContext from '../contexts/WunderContext';

const initialItem = {

    title: "",

    completed: false,
};

function AllLists() {

    const {mainForm, setMainForm} = useContext(WunderContext);
        
    return (

        <div>
            <div>
            <h2>Welcome to Zoe's World</h2>

            <link to="/search">
            <button>Search Tasks</button>
            </link>
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

        </div>
    )
}

export default AllLists