import React from "react";
import axios from "axios";
import { MDBIcon } from "mdbreact";
import "../style/loginform.css";
import ListCountries from "./ListCountries";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passErr: "",
      passsErr: "",
      emailErr: "",
      first_name: "",
      firstNameErr: "",
      last_name: "",
      lastNameErr: "",
      password_confirmation: "",
      passConfErr: "",
      phone: "",
      balance: 0,
      balanceErr: "",
      country: "",
      state: "",
      date_of_birth: "",
      date_of_birth_error: "",
    };
  }
  SetRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  componentDidMount() {
    axios
      .get("/api/user")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  SetStateLogin = () => {
    this.setState({
      loggedIn: true,
    });
  };

  handleChange = ({ target }) => {
    this.setState({ ...this.state, [target.name]: target.value });
  };

  validatePhoneNumber(input_str) {
    var re = /^[\+]?\d{11}$/;

    console.log(re.test(input_str));
  }
  onSubmitt = (e) => {
    e.preventDefault();
    var error = [];
    if (this.state.email === "") {
      this.setState({
        emailErr: "Please enter your email.",
      });
      error.push("Email error");
    }  else {
      if (!this.ValidateEmail(this.state.email)) {
        this.setState({
          emailErr: "please enter a valid email address",
        });
      } else {
        this.setState({
          emailErr: "",
        });
      }
    }
    if (this.state.password === "") {
      this.setState({
        passErr: "Please enter your password",
      });
      error.push("Password error");
    } else {
      this.setState({
        passErr: "",
      });
    }
    if (this.state.country === "") {
      this.setState({
        CountryErr: "Please enter your country",
      });
      error.push("Password error");
    } else {
      this.setState({
        CountryErr: "",
      });
    }
    if (this.state.balance <= 0) {
      this.setState({
        balanceErr: "Please enter a valid Balance",
      });
      error.push("Password error");
    } else {
      this.setState({
        balanceErr: "",
      });
    }
    if (this.state.first_name === "") {
      this.setState({
        firstNameErr: "Please enter your first name",
      });
      error.push("first name error");
    } else {
      this.setState({
        firtsNameErr: "",
      });
    }
    if (this.state.last_name === "") {
      this.setState({
        lastNameErr: "Please enter your last name",
      });
      error.push("last name error");
    } else {
      this.setState({
        lastNameErr: "",
      });
    }
    if (this.state.phone === "") {
      this.setState({
        phoneErr: "Please enter your phone number",
      });
      error.push("phone number error");
    } else {
      if (!this.validatePhoneNumber(this.state.phone)) {
        this.setState({
          phoneErr: "Invalid phone number",
        });
        error.push("phone number error");
      } else {
        this.setState({
          phoneErr: "",
        });
      }
    }
    if (this.state.date_of_birth === "") {
      this.setState({
        date_of_birth_error: "Please enter your date of birth",
      });
      error.push("date error");
    } else {
      this.setState({
        date_of_birth_error: "",
      });
    }
    

    if (!this.state.password_confirmation === this.state.password) {
      this.setState({
        passConfErr: "incorrect password",
      });
      error.push("Password error");
    } else {
      this.setState({
        passConfErr: "",
      });
    }
    axios.defaults.withCredentials = true;
    console.log(this.state.country);
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/register", this.state).then((res) => {
        sessionStorage.setItem("loggedIn", true);
        this.setState({
          email: "",
          password: "",
        });
        this.props.history.push("/PaymentDetails");
        console.log(res.config["data"]);
      });
    });
  };
  onChangeRegion = (val) => {
    console.log(val);
    this.setState({
      state: val,
    });
  };
  onChangeCountry = (val) => {
    this.setState({
      country: val,
    });
  };
  ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }
  onSubmit = (e) => {
    e.preventDefault();
    var error = [];
    if (this.state.email === "") {
      this.setState({
        emailErr: "Please enter your email.",
      });
      error.push("Email error");
    } else {
      if (!this.ValidateEmail(this.state.email)) {
        this.setState({
          emailErr: "please enter a valid email address",
        });
      } else {
        this.setState({
          emailErr: "",
        });
      }
    }
    if (this.state.password === "") {
      this.setState({
        passsErr: "Please enter your password",
      });
      error.push("Password error");
    } else {
      this.setState({
        passsErr: "",
      });
    }
    axios.defaults.withCredentials = true;
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post("/login", this.state)
        .then((res) => {
          this.setState({
            email: "",
            password: "",
          });
          console.log("logged in :", res);
          sessionStorage.setItem("loggedIn", true);
          this.props.history.push("/WelcomePage");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  render() {
    return (
      <>
        <div className="App">
          <div className="container" id="container">
            <div className="form-container sign-up-container">
              <form action="#">
                <h1 style={{ color: "#595959" }}>Sign Up</h1>

                <div style={{ display: "flex", width: "350px" }}>
                  <MDBIcon
                    fas
                    icon="signature"
                    style={{ padding: "10px", marginTop: "5px" }}
                  />
                  <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.first_name}
                    name="first_name"
                    placeholder="First Name"
                  />
                </div>
                <label className="message">{this.state.firstNameErr}</label>

                <div style={{ display: "flex", width: "350px" }}>
                  <MDBIcon
                    fas
                    icon="signature"
                    style={{ padding: "10px", marginTop: "5px" }}
                  />
                  <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.last_name}
                    name="last_name"
                    placeholder="Last Name"
                  />
                </div>
                <label className="message">{this.state.lastNameErr}</label>

                <div style={{ display: "flex", width: "350px" }}>
                  <MDBIcon
                    fas
                    icon="envelope"
                    style={{ padding: "10px", marginTop: "5px" }}
                  />
                  <input
                    type="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <label className="message">{this.state.emailErr}</label>

                <div style={{ display: "flex", width: "350px" }}>
                  <MDBIcon
                    fas
                    icon="phone-alt"
                    style={{ padding: "10px", marginTop: "5px" }}
                  />
                  <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.phone}
                    name="phone"
                    placeholder="Phone"
                  />
                </div>
                <label className="message">{this.state.phoneErr}</label>

                <div style={{ display: "flex", width: "350px" }}>
                  <MDBIcon
                    fas
                    icon="calendar-alt"
                    style={{ padding: "10px", marginTop: "5px" }}
                  />
                  <input
                    type="date"
                    onChange={this.handleChange}
                    value={this.state.date_of_birth}
                    name="date_of_birth"
                    placeholder="Date of birth"
                  />
                </div>
                <label className="message">
                  {this.state.date_of_birth_error}
                </label>

                <div style={{ display: "flex" }}>
                  <MDBIcon
                    fas
                    icon="map-marked-alt"
                    style={{
                      padding: "10px",
                      marginRight: "15px",
                      marginTop: "5px",
                    }}
                  />
                  <ListCountries
                    country={this.onChangeCountry}
                    state={this.onChangeRegion}
                  />
                </div>
                <label className="message">{this.state.CountryErr}</label>

                {/* <div style={{display:"flex",width:"350px"}}>
        <MDBIcon fas icon="hand-holding-usd" style={{padding: "10px",marginTop:"5px"}}/>
        <input type="text" onChange={this.handleChange} value={this.state.balance} name ="balance" placeholder="Balance"  /></div>
        <label className="message">{ this.state.balanceErr }</label> */}

                <div style={{ display: "flex", width: "400px" }}>
                  <MDBIcon
                    fas
                    icon="user-lock"
                    style={{ padding: "10px", marginTop: "5px" }}
                  />
                  <input
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    name="password"
                    placeholder="Password"
                  />

                  <MDBIcon
                    fas
                    icon="lock"
                    style={{ padding: "10px", marginTop: "5px" }}
                  />
                  <input
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password_confirmation}
                    name="password_confirmation"
                    placeholder="Confirm Password"
                  />
                </div>
                <label className="message">{this.state.passErr}</label>
                {/* <a onClick={this.handleClickOpen}>
         Choose Location
        </a> */}
                <br />
                <button className="buttonlogin" onClick={this.onSubmitt}>
                  Sign Up
                </button>
              </form>
            </div>
            <div className="form-container sign-in-container">
              <form action="#">
                <h1 style={{ color: "#595959" }}>Sign in</h1>
                <br />
                <div style={{ display: "flex", width: "350px" }}>
                  <MDBIcon
                    fas
                    icon="envelope"
                    style={{ padding: "10px", marginTop: "10px" }}
                  />
                  <input
                    type="email"
                    onChange={this.handleChange}
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <label className="message">{this.state.emailErr}</label>
                <div style={{ display: "flex", width: "350px" }}>
                  <MDBIcon
                    fas
                    icon="lock"
                    style={{ padding: "10px", marginTop: "10px" }}
                  />
                  <input
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <label className="message">{this.state.passsErr}</label>

                <br />
                <button className="buttonlogin" onClick={this.onSubmit}>
                  Sign In
                </button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <button
                    className="ghost buttonlogin"
                    id="signIn"
                    onClick={() => {
                      const container = document.getElementById("container");
                      container.classList.remove("right-panel-active");
                    }}
                  >
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button
                    className="ghost buttonlogin"
                    id="signUp"
                    onClick={() => {
                      const container = document.getElementById("container");
                      container.classList.add("right-panel-active");
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Login;
