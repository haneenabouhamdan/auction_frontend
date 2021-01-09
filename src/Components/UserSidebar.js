import React from 'react';
import {MDBIcon } from "mdbreact";
class UserSidebar extends React.Component{

render(){
    return (
<div id="sidebar-wrapper">
      <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <a href="#">
            <h4>
            <a href="/welcomePage"><MDBIcon fas icon="home" /> D.P.M</a></h4>
          <hr style={{color:'white',backgroundColor:'white'}}/>
          </a>
        </li>
        <li>
        <a href="/userprofile">Dashboard</a>
        </li>
        <li>
          <a href="/myauctions">My Auctions</a>
        </li>
        <li>
          <a href="#">Winning Bids</a>
        </li>
        <li>
          <a href="/favItems">Favorite Bids</a>
        </li>
        {/* <li>
          <a href="/notification">My Alerts</a>
        </li> */}
       
      </ul>
    </div>
    )
}
}
export default UserSidebar;