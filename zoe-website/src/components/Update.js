import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import WunderContext from '../contexts/WunderContext';


const initialItem = {

    name: ""

};

const Update = props => {

    const {mainForm, setMainForm} = useContext(WunderContext);  
    const [wunder, setWunder] = useState(initialItem);

    console.log(mainForm)
    console.log(props)
    console.log(props.match.params.id)

    const changeHandler = e => {
      e.persist();
      let value = e.target.value;
    
    setWunder({
        ...wunder,
        [e.target.name]: value
      });
  };

    useEffect(() => {
        // Solves refresh race condition
        console.log(props)
        if (mainForm.length > 0) {
          const newFile = mainForm.find(
            thing => `${thing.id}` === props.match.params.id
          );
          setWunder(newFile);
        }
      }, [mainForm, props.match.params.id]);

    const handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth()
        .put(`https://zoe-backend.herokuapp.com/todo/${wunder.id}`, wunder)
        .then(res => {

          axiosWithAuth()
          .get('https://zoe-backend.herokuapp.com/todo/')
          .then(response => {
            setMainForm(response.data)});
            props.history.push(`/lists`);
        })
        .catch(err => console.log(err));
    };

  const deleteList = e => {
      e.preventDefault();
      axiosWithAuth()
      .delete(`https://zoe-backend.herokuapp.com/todo/${wunder.id}`)
        .then(res => {

          axiosWithAuth()
          .get('https://zoe-backend.herokuapp.com/todo')
          .then(response => {
            setMainForm(response.data)});
            props.history.push("/lists");
        })
        .catch(error => console.log(error));
    }

    const postNewWunder = p => {
      const newWunder = {
        
        name: p.name,
        user_id: wunder.user_id
        
      };

      console.log(newWunder)
      axiosWithAuth()
        .post(`https://zoe-backend.herokuapp.com/todo/`, newWunder )
        .then(response => {
          
          axiosWithAuth()
          .get('https://zoe-backend.herokuapp.com/todo/')
          .then(response => {
            setMainForm(response.data)});
            props.history.push("/lists");

        })
        .catch(error => {
          console.log("the data was not posted", error);
        });
    };

    const addHandleSubmit = e => {
      e.preventDefault();
      postNewWunder(wunder);
      //resetting form
      setWunder({ 
        name: "" });
      };


console.log(wunder)

return (

    <div>
    <h2>Update or Delete Task</h2>
      <form onSubmit={handleSubmit}>
        
            <h3>Todo</h3>
            <input type="text" name="name" onChange={changeHandler} placeholder="name" value={wunder.name} />

            <button>Update</button>

            <button onClick={deleteList}>
                Delete
            </button>
        
      </form>

    <h2>Add New Task</h2>
    <form onSubmit={addHandleSubmit}>
        
      <input type="text" name="name" onChange={changeHandler} placeholder="name" value={wunder.name} />

      <button>Add</button>
    
    </form>

    </div>
  );
};

export default Update;