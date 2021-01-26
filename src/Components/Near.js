import axios from "axios";
import React from "react";
import Pagination from "react-js-pagination";
import Slideshow from "./Slideshow";
import { Card, CardBody } from "reactstrap";
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";
import "../App.css";
import firebase from "../utils/firebase";
import AddBid from "./AddBid";
import CountBids from "./CountBids";
import * as turf from "@turf/turf";
let win = "";
class Near extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 0,
      auctions: [],
      coordinates: [],
      lists: [],
      longitude: 0,
      auc: [],
      latitude: 0,
      fl: true,
      min: 0,
      item_id: 0,
    };
    this.handleClickOpenDet = this.handleClickOpenDet.bind(this);
  }
  async componentDidMount() {
    await this.locate();
    await this.near();
    await this.getBidsHistory();
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  countDownDate(date) {
    return new Date(date).getTime();
  }
  handleClickOpenDet = (item) => {
    window.location.assign("/itemDetails/".concat(item));
  };
  getBidsHistory = () => {
    const bidsref = firebase.database().ref("Bids");
    bidsref.on("value", (snapshot) => {
      const lists = snapshot.val();
    let list = [];
    for (const  [key , value] of Object.entries(lists)) {
        list.push(value);
    }
      this.setState({ lists: list });
    });
  };
  forcerender = () => {
    setInterval(() => {
      this.setState({
        fl: !this.state.fl,
      });
    }, 3000);
  };
  addFav(itemid) {
    let formData = {
      auction_id: itemid,
    };
    axios.defaults.withCredentials = true;
    axios.post(`/api/addFav`, formData).then((res) => {
      // console.log(res);
    });
  }
  rendarTimeLaps(item) {
    var now = new Date().getTime();
    var countDownDate = new Date(item.planned_close_date).getTime();
    var timeleft = countDownDate - now;
    if (timeleft < 0) {
      return "Auction Ended";
    }
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    this.forcerender();
    return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  }
  near = () => {
    let ob = [];
    axios.defaults.withCredentials = true;
    axios.get("/api/getAllAuctions").then((res) => {
      const coor = res.data.items.data;
      coor.map((item) => {
        if(item.actual_close_date == null){
        let dist = 0;
        dist = this.getdistance(item.longitude, item.latitude);
        ob.push({ item, dist });
      }
      
    });
      let list = ob.sort((a, b) => a.dist - b.dist);
      this.setState({ auctions: list });
      // console.log(list[0].item)
    });
  };

  locate() {
    window.onload = function () {
      var startPos;
      var geoSuccess = function (position) {
        startPos = position;
        this.setState({
          latitude: startPos.coords.latitude,
          longitude: startPos.coords.longitude,
        });
      }.bind(this);
      navigator.geolocation.getCurrentPosition(geoSuccess);
    }.bind(this);
  }
  getdistance(lng, lat) {
    var to = [lng, lat];
    var from = [35.5172352, 33.862451199999995];
    var options = { units: "kilometers" };
    var distance = turf.distance(to, from, options);
    return distance;
  }
  getitems = () => {
    const data = this.state.auctions;
    // console.log(data);
    const maxbids = this.state.lists;
    // var n=0;
    return (
      <React.Fragment>
        <div>
          {data.map((item, index) => {
              let max = 0;
            if (index < 4) {
              return (
                <MDBRow className="itemms" key={index}>
                  <MDBCol md="4">
                    <Slideshow
                      className="images"
                      images={item.item.auction_images}
                    />
                  </MDBCol>

                  <MDBCol md="8" className="prop">
                    {sessionStorage.getItem("logged In") ? (
                      <MDBRow>
                        <button
                          type="submit"
                          className="favo"
                          onClick={() => this.addFav(item.id)}
                        >
                          <img
                            style={{ width: "20px", height: "20px" }}
                            src="data:image/png;base64,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"
                          />
                        </button>
                      </MDBRow>
                    ) : (
                      <></>
                    )}
                    <MDBRow
                      onClick={() => this.handleClickOpenDet(item.item.id)}
                    >
                      {item.item.actual_close_date ? (
                        <h5 style={{ color: "grey", marginLeft: "15px" }}>
                          Auction Closed
                        </h5>
                      ) : (
                        <h5 style={{ color: "grey", marginLeft: "15px" }}>
                          {this.rendarTimeLaps(item.item)}
                        </h5>
                      )}
                    </MDBRow>
                    <MDBRow style={{ marginTop: "20px" }}> </MDBRow>
                    {item.item.bedrooms > 0 ? (
                      <div className="flex">
                        {item.item.bedrooms} Beds <strong>. </strong>
                      </div>
                    ) : (
                      <></>
                    )}
                    {item.item.bathrooms > 0 ? (
                      <div className="flex">
                        {item.item.bathrooms} Baths <strong>. </strong>
                      </div>
                    ) : (
                      <></>
                    )}
                    {item.item.diningrooms > 0 ? (
                      <div className="flex">
                        {item.item.diningrooms} Dinings <strong>. </strong>
                      </div>
                    ) : (
                      <></>
                    )}
                    {item.item.parking > 0 ? (
                      <div className="flex">
                        {item.item.parking} Parking <strong>. </strong>
                      </div>
                    ) : (
                      <></>
                    )}
                    {item.item.area > 0 ? (
                      <div className="flex">
                        {this.numberWithCommas(item.item.area)} sqft{" "}
                      </div>
                    ) : (
                      <></>
                    )}
                    <MDBRow>
                      <div className="servic">
                        {this.state.elevator == "0" ? " " : " Elevator "}
                        <label> • </label>
                        {this.state.heating_cooling == "0"
                          ? " "
                          : " Heating and cooling "}
                        <label> • </label>
                        {this.state.electricity == "0" ? " " : " Electricity "}
                      </div>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol>
                        <CountBids id={item.item.id} />
                        <strong style={{ color: "grey", fontWeight: 300 }}>
                          {" "}
                          Bids
                        </strong>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol className="biss">
                        <i>Starting Bid</i>
                        <br />
                        <h6 style={{ marginLeft: "5px" }}>
                          {" "}
                          ${this.numberWithCommas(item.item.starting_price)}+
                        </h6>
                      </MDBCol>
                      <MDBCol className="biss">
                        <i>Current Bid</i>
                        <br />
                        {maxbids.map((i,ind) => {
                        if (i.item_id == item.item.id){ 
                            if (i.price > max) {
                              max = i.price;
                              win = i.user_id;
                            }
                          }
                        })}
                        <div key={index}>
                          <h6 style={{ marginLeft: "5px" }}>
                            $ {this.numberWithCommas(max)}
                          </h6>
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <hr style={{ height: "3px", color: "grey" }} />
                  </MDBCol>
                </MDBRow>
              );
            }
          })}
        </div>
      </React.Fragment>
    );
  };
  render() {
    return (
      <div className="h-100">
        <MDBRow className="h-100">
          <MDBCol md="8">
            <div style={{ marginTop: "20px", marginLeft: "20px" }}>
              {this.getitems()}
            </div>
          </MDBCol>
          <MDBCol style={{ marginTop: "20px", marginLeft: "80px" }}>
            <Card style={{ width: "250px" }}>
              <CardBody>
                <h4 style={{ opacity: 0.8 }}>Mission</h4>
                <div style={{ color: "grey" }}>
                  Assist Clients with profit maximization of assets in a timely
                  and efficient disposition manner Prepare Personal Property
                  Valuation Reports for Decision Makers
                </div>
                <hr />
                <h4 style={{ opacity: 0.8 }}>Values</h4>
                <div style={{ color: "grey" }}>
                  Through honesty, integrity and excellence, we provide expert
                  service and consideration to our clients while providing an
                  enjoyable environment for our clients, customers and
                  employees.
                </div>
                <hr />
                <h4 style={{ opacity: 0.8 }}>Vision</h4>
                <div style={{ color: "grey" }}>
                  To continue our exemplary service to our clients and customers
                  and to remain the industry leader of Liquidation Marketing
                  Solutions in the State of Mississippi and beyond.
                </div>
                <hr />
                <h4 style={{ opacity: 0.8 }}>Contact Us</h4>
                <div style={{ color: "grey" }}>
                
                  <MDBIcon icon="envelope"/>   dpm@gmail.com<br />
                  <MDBIcon icon="phone"/>   +961 70684014 <br />
                
                </div>
              </CardBody>
            </Card>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}
export default Near;
