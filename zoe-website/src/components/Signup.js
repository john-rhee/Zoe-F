import React, { useState } from "react";
import { connect } from "react-redux";
import { signUp } from "../actions/index";


const Signup = props => {
  const [signup, setsignup] = useState({
    full_name: "",
    username: "",
    password: ""
  });

  const handleSubmit = event => {
    event.preventDefault();
    props.signUp(signup);
    props.history.push("/");
    setsignup({ full_name: "",username: "",password: "" });
  };

  const handleChange = event => {
    setsignup({ ...signup, [event.target.name]: event.target.value });
  };

  return (
    <div className="signup-component">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>

        <br />

        <input
          required
          type="text"
          name="full_name"
          placeholder="Name"
          value={signup.full_name}
          onChange={handleChange}
        />

        <br />

        {/* <label>Email</label> */}

        <br />

        <input
          required
          type="username"
          name="username"
          placeholder="Username"
          value={signup.username}
          onChange={handleChange}
        />

        <br />

        {/* <label>Password</label> */}

        <br />

        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          value={signup.password}
          onChange={handleChange}
        />

        <br />

        <button type="submit" className="next-button">
          Sign Up
        </button>
      </form>
      
    </div>
  );
};

export default connect(null, { signUp })(Signup);
