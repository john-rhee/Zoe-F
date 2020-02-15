import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Nav = props => {
  
  const logOut = () => {
    localStorage.removeItem("token");
    props.history.push("/");
  };


  return (
    <div className="nav-component">
      <div className="nav-bar">
        <h1>Zoe's Website</h1>
        <h1>
        {props.userData.username}
        </h1>
      </div>
      <div className="menu-list" id="nav">
        {localStorage.getItem("token") ? (
          <div>
            <NavLink to="/home" >
              Home
            </NavLink>
            {/* <p>{props.userData.username}</p> */}
            <button onClick={() => logOut()}>Log Out</button>
          </div>
        ) : (
          <div>

            <NavLink to="/home">
              {" "}
              Home{" "}
            </NavLink>
            <NavLink to="/signup" >
              {" "}
              Sign Up
            </NavLink>
            <NavLink to="/login" >
              {" "}
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

export default connect(mapStateToProps)(withRouter(Nav));
