import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBIcon,
} from "mdbreact";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import "../App.css";

class Navbar extends Component {
  state = {
    categories: [],
    landsCat: [],
    isOpen: false,
    first_name: "",
    last_name: "",
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;
    axios.get("/api/user").then((response) => {
      this.setState({
        first_name: response.data.first_name,
        last_name: response.data.last_name,
      });
    });
  }
  logout = (e) => {
    e.preventDefault();
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/logout").then((res) => {
        sessionStorage.removeItem("loggedIn");
      });
    });
    // window.location.reload();
  };
  login = (e) => {
    this.props.history.push('/login')
    // <Redirect to="/login" />;
  };
  render() {
    return (
      <Router>
        <MDBNavbar expand="md" className="nabar">
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          {sessionStorage.getItem("loggedIn") ? (
            <MDBNavbarNav left>
              <MDBNavItem
                active
                style={{ marginTop: "10px", marginRight: "15px" }}
              >
                <a href="/" style={{ color: "white" }}>
                  Home
                </a>
              </MDBNavItem>
              <MDBNavItem active style={{ marginTop: "10px" }}>
                <a href="/userprofile" style={{ color: "white" }}>
                  Profile
                </a>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!" className="Navv"></MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          ):(
            <MDBNavbarNav left>
            <MDBNavItem
              active
              style={{ marginTop: "10px", marginRight: "15px" }}
            >
              <a href="/" style={{ color: "white" }}>
                Home
              </a>
            </MDBNavItem>
            <MDBNavItem active style={{ marginTop: "20px" }}>
                <a href="/userprofile" style={{ color: "#32b69b" }}>
                  profile
                </a>
              </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!" className="Navv"></MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          )}
            <MDBNavbarNav left>
              <MDBNavItem>
                <a href="/welcomePage">
                  <h3 className="Navv">
                    <MDBIcon fas icon="home" className="Navv" /> D.P.M
                  </h3>
                </a>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <p></p>
                <p></p>
              </MDBNavItem>

              <MDBNavItem>
                {sessionStorage.getItem("loggedIn") ? (
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret className="Navvv">
                      <MDBIcon icon="user" className="Navvv" />{" "}
                      {this.state.first_name}
                    </MDBDropdownToggle>

                    <MDBDropdownMenu className="dropdown-default" right>
                      <a href="/login" className="Navvi">
                        <button onClick={this.logout} className="b">
                          SignOut
                        </button>
                      </a>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                ) : (
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret className="Navvv">
                      Join <MDBIcon icon="user" className="Navvv" />
                    </MDBDropdownToggle>

                    <MDBDropdownMenu className="dropdown-default" right>
                      <a href="/login" className="Navvi">
                        <button className="b">SignIn/SignUp</button>
                      </a>
                      </MDBDropdownMenu>
                   
                  </MDBDropdown>
                )}
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
    );
  }
}
export default Navbar;
