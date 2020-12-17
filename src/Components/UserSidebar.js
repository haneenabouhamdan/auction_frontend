import React from 'react';
import {MDBIcon } from "mdbreact";
class UserSidebar extends React.Component{

render(){
    return (
<div id="sidebar-wrapper">
      <ul class="sidebar-nav">
        <li class="sidebar-brand">
          <a href="#">
            <h4>
          <MDBIcon fas icon="home" /> Mazad</h4>
          <hr style={{color:'white',backgroundColor:'white'}}/>
          </a>
        </li>
        <li>
          <a href="#">My Bids</a>
        </li>
        <li>
          <a href="#">Winning Bids</a>
        </li>
        <li>
          <a href="#">Favorite Bids</a>
        </li>
        <li>
          <a href="#">My Alerts</a>
        </li>
        <li>
          <a href="/welcomePage"><MDBIcon fas icon="arrow-left" /></a>
        </li>
      </ul>
    </div>
    )
}
}
export default UserSidebar;