import React from "react";
import Navbar from "../Components/Navbar";
import welcome from "../images/welcome.jpeg";
import { MDBIcon } from "mdbreact";
import "../style/MyAuctions.css";
import MainCategories from "./MainCategories";
// import InitMap from '../Components/Maps';
class welcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="home">
        <Navbar />

        <div
          className="search"
          style={{
            backgroundImage: `url(${welcome})`,
            backgroundSize: "100% 600px",
          }}
        >
<h2 style={{color:"transparent"}}>nbkn</h2>
          <div className="boxSearch">
          <h6 style={{color:"transparent"}}>nbkn</h6>
            <h1><strong>Bid, Win and Close with confidence !! </strong></h1>
            <input
              type="text"
              className="locs"
              placeholder=" Address, city, state, country..."
            />
            <button className="buts">
              <MDBIcon icon="search"></MDBIcon>
            </button>
          </div>
        </div>
        <MainCategories />
        <div>
          
        </div>
      </div>
    );
  }
}
export default welcomePage;
