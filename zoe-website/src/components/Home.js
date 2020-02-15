import React, { useState } from "react";
import { connect } from "react-redux";

const Home = props => {
 
  return (
    <div className="home">
      <h1>Upload Image</h1>

      <form action="/upload" method="post" enctype="multipart/form-data">

        <input type="file" accept="image/*" name="photo"/>

        <input type="submit" value="upload"/>
          
        

      </form>
      
    </div>
  );
};

const mapStateToProps = state => {
    return {
      pictures: state.pictures
    };
  };
  
  export default connect(mapStateToProps, { })(Home);