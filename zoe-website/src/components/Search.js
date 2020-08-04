import React, { useContext, useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SingleList from './SingleList';
import WunderContext from '../contexts/WunderContext';



function Search() {

    const {mainForm, setMainForm} = useContext(WunderContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const searchHandleChange = event => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    };

    useEffect(() => {
    const results = mainForm.filter(dataObject =>
        dataObject.name.toLowerCase().includes(searchTerm.toLowerCase())
        );  
    setSearchResults(results)
    }, [searchTerm]);
        
    return (

        <div>
            <h2>Search Task</h2>
            <form>
            <input
                type="text"
                name="search"
                placeholder="Search Task"
                value={searchTerm}
                onChange={searchHandleChange}
            />

            </form>
            <div>
            {searchResults.map((data) => (
                <div key={data.id}>
                {/* {data.title} */}
                <Route render={props => {return <SingleList {...props} wList={data} />}} />
                </div>
            ))}
            </div> 

        </div>
    )
}

export default Search