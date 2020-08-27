import React, {useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';



function Register(props) {
    const [user, setUser] = useState({username: '', password: ''});

    const handleChanges = e => {


        setUser({ ...user, [e.target.name]: e.target.value });
      };

    const submitForm = e => {
        e.preventDefault();

        ///added for form validation demo
        let message = ""
        if (user.password.length <= 4){
            message='Password must be longer than 4 characters'
        }

        if (message) {
            setUser({ ...user, message });
            return 
        }

        axiosWithAuth().post('https://zoe-backend.herokuapp.com/users/register', user)
        // axiosWithAuth().post('http://localhost:5000/users/register', user)
            .then(response => {
                props.history.push('/login')
            })
            .catch(error => {
                console.log(error)
                setUser({username: '', password: ''}) 
            })

    };

    return (
        <div>
            <form onSubmit={submitForm} style={{margin: "5% 25%"}}>
            <h2>Register</h2>
            
                
                <input type="username" name="username" id="username" placeholder="Username" value={user.username} onChange={handleChanges} />
            
                <input type="password" name="password" id="password" placeholder="Password" value={user.password} onChange={handleChanges} />

                {/* added for form validation demo */}
                <div>{user.message}</div>
                
                <button type="submit">Submit</button>
                
            </form>
        </div>
    )
}

export default Register