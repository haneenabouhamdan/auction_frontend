import React from 'react';
import {MDBIcon } from "mdbreact";
class UserSidebar extends React.Component{

render(){
    return (
<div id="sidebar-wrapper">
      <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <a href="#">
          <a href="/welcomePage">
            <h4>
              <MDBIcon fas icon="home" /> D.P.M</h4></a>
          <hr style={{color:'white',backgroundColor:'white'}}/>
          </a>
        </li>
        <li>
        <a href="/userprofile">Dashboard</a>
        </li>
        <li>
          <a href="/userauctions">My Auctions</a>
        </li>
        <li>
          <a href="#">Winning Bids</a>
        </li>
        <li>
          <a href="/favorites">Favorite Bids</a>
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