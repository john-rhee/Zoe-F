import React, {useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";
const Button = styled(MuiButton)(spacing);



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
        <div class="registerForm" >
            <form onSubmit={submitForm} >
            <h2>Register</h2>

            <div class="registerForm2" >
            
            <input class="registerForm3" type="username" name="username" id="username" placeholder="Username" value={user.username} onChange={handleChanges} />
            
            <input class="registerForm3" type="password" name="password" id="password" placeholder="Password" value={user.password} onChange={handleChanges} />
 
            </div>

            {/* added for form validation demo */}
            <div>{user.message}</div>
                
            <Button my={1}  variant="contained" color="primary" type="submit">Submit</Button>
                
            </form>
        </div>
    )
}

export default Register