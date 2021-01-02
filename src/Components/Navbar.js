import { useState } from 'react'
import React, { Component }from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter as Router, Redirect,NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import axios from 'axios'
import '../App.css'


class Navbar extends Component {
    state = {
      categories:[],
      landsCat:[],
        isOpen: false
        };

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}
// getCategories = ()=>{
//   axios.defaults.withCredentials=true;
//      axios.get('/api/getHomesCategories').then((response)=>{
//         return response.data.categories;
//       }).then((categories)=>{
//         this.setState({
//          categories:categories});
//       });
//   }
//   getCategoriesLands = ()=>{
//     axios.defaults.withCredentials=true;
//        axios.get('/api/getLandsCategories').then((response)=>{
//           return response.data.categories;
//         }).then((categories)=>{
//           this.setState({
//            landsCat:categories});
//         });
//     }
  componentDidMount(){
    // this.getCategories();
    // this.getCategoriesLands();
  }   
logout = e => {
    e.preventDefault();
    axios.get("/sanctum/csrf-cookie").then(response => {
      axios.post("/logout").then(res => {
        sessionStorage.removeItem('loggedIn'); 
      });
    });
};
login = e =>{
  <Redirect to="/login"/>
}
render() {
  return (
    <Router>
      <MDBNavbar expand="md"  className="nabar">
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
          <MDBNavItem active style={{marginTop:"20px",marginRight:"15px"}}>
            <a href="/" style={{color:"white"}} >Home</a>
            </MDBNavItem>
            <MDBNavItem active style={{marginTop:"20px"}}>
              <a href="/userprofile" style={{color:"white"}} >Profile</a>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!" className="Navv"></MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav left>
          <MDBNavItem>
          <MDBNavLink className="waves-effect waves-light" to="#!">
               <h3 className="Navv"><MDBIcon fas icon="home" className="Navv" /> D.P.M</h3>
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
            
              <MDBDropdown >
                <MDBDropdownToggle nav caret className="Navvv">
                  Join <MDBIcon icon="user" className="Navvv"/>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default"  right>
                  <a href="/login" className="Navvi">
                    <button  className="b">SignIn</button>
                    </a>
                  <a href="/login"  className="Navvi">
                    <button onClick={this.logout} className="b">SignOut</button>
                    </a>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
    );
  }
}
export default Navbar;