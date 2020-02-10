import React, { useState } from "react";
import { login } from "../actions/index";
import { connect } from "react-redux";

const Login = props => {
  const [loginInfo, setLogininfo] = useState({ username: "", password: "" });

  const handleSubmit = event => {
    event.preventDefault();
    props.login(loginInfo);
    // .then(() => props.history.push('/'))
    props.history.push("/");
    setLogininfo({ username: "", password: "" });
  };

  const handleChange = event => {
    setLogininfo({ ...loginInfo, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-component">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {/* <label>Email</label> */}
        <br />
        <input
          required
          type="text"
          name="username"
          placeholder="username"
          value={loginInfo.username}
          onChange={handleChange}
        />
        <br />
        {/* <label>Password</label> */}
        <br />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          value={loginInfo.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit" className="next-button">
          Log In
        </button>
      </form>

    </div>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

export default connect(mapStateToProps, { login })(Login);
