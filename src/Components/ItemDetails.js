import React from "react";
import axios from "axios";
import "../App.css";
import Slideshow from "./Slideshow";
import firebase from "../utils/firebase";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import AddBid from "./AddBid";
import ViewOnMapd from "./ViewOnMapd";
import Gallery from "./gallery";
import Navbar from "./Navbar";
import { CardBody, Button, Card, Input, CardHeader } from "reactstrap";
import AddBidD from "./AddBidD";
let win="";
class ItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: "",
      latitude: "",
      area: "",
      description: "",
      bedrooms: "",
      bathrooms: "",
      diningrooms: "",
      Balcony: "",
      type: "",
      parking: "",
      elevator: false,
      electricity: false,
      heating_cooling: false,
      start_date: "",
      planned_close_date: "",
      starting_price: "",
      preferred_price: 0,
      final_price: 0,
      auction_categories_id: "",
      images: [],
      lists: [],
      first_name: "",
      image: "",
      last_name: "",
      phone: "",
      date_of_birth: "",
      email: "",
      country: "",
      state: "",
      users_id: 0,
      id: 0,
      item: this.props.item,
      setOpenDet: this.props.openDet,
      coordinates: [],
      fl: true,
    };
    //    console.log(this.props.match.params.id);

    //    this.rendarTimeLaps = this.rendarTimeLaps.bind(this);
  }
  async componentDidMount() {
    await this.getItemDetails();
    await this.getBidsHistory();
  }

  getUser() {
    axios.defaults.withCredentials = true;
    axios.get("/api/getUser/".concat(this.state.users_id)).then((res) => {
      console.log(res);
      this.setState({
        first_name: res.data.user.first_name,
        last_name: res.data.user.last_name,
        id: res.data.user.id,
        email: res.data.user.email,
        phone: res.data.user.phone,
        image: res.data.user.image,
        date_of_birth: res.data.user.date_of_birth,
        country: res.data.user.country,
        state: res.data.user.state,
      });
    });
  }
  async getItemDetails() {
    const data = this.props.match.params.id;
    console.log(data.users_id)
    axios.defaults.withCredentials = true;
    await axios.get("/api/getDetails/".concat(data)).then((res) => {
      console.log(res.data.item[0]);
      this.setState({
        longitude: res.data.item[0].longitude,
        latitude: res.data.item[0].latitude,
        area: res.data.item[0].area,
        description: res.data.item[0].description,
        bedrooms: res.data.item[0].bedrooms,
        bathrooms: res.data.item[0].bathrooms,
        diningrooms: res.data.item[0].diningrooms,
        Balcony: res.data.item[0].Balcony,
        type: res.data.item[0].type,
        id: res.data.item[0].id,
        parking: res.data.item[0].parking,
        elevator: res.data.item[0].elevator,
        electricity: res.data.item[0].electricity,
        heating_cooling: res.data.item[0].heating_cooling,
        start_date: res.data.item[0].start_date,
        planned_close_date: res.data.item[0].planned_close_date,
        starting_price: res.data.item[0].starting_price,
        preferred_price: res.data.item[0].preferred_price,
        final_price: res.data.item[0].final_price,
        auction_categories_id: res.data.item[0].auction_categories_id,
        images: res.data.item[0].auction_images,
        users_id: res.data.item[0].users_id,
      });
    });
    await this.getUser();
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  countDownDate(date) {
    return new Date(date).getTime();
  }

  forcerender = () => {
    setInterval(() => {
      this.setState({
        fl: !this.state.fl,
      });
    }, 3000);
  };
  async closeAuc(id, win) {
    const lists = this.state.lists;
    this.setState({ closed: true });
    let today = new Date();
    let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    let month = today.getMonth() + 1;
    let todayDB =
      today.getFullYear() +
      "-" +
      month +
      "-" +
      day +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    let formData = {
      auction_id: id,
      closeDate: todayDB,
    };
    // console.log(this.state.winner_name);
    await this.getUserByFullName(win.username);
    axios.defaults.withCredentials = true;
    await axios.post(`/api/closeAuc`, formData).then((res) => {
      // window.location.reload();
    });
    const templateId = "template_u5lgbco";
  
    this.sendFeedback(templateId, {
      send_to: this.state.winner_email,
      owner_email: this.state.owner_email,
      owner_tel: this.state.owner_tel,
      owner_name: this.state.owner_name,
      to_name: this.state.winner_name,
      message_html: this.state.feedback,
      from_name: this.state.name,
      reply_to: this.state.email,
      owner_loc: this.state.location,
    });
  }
  rendarTimeLaps() {
    const data = this.props.match.params.id;
    var now = new Date().getTime();
    var countDownDate = new Date(this.state.planned_close_date).getTime();
    var timeleft = countDownDate - now;
    if (timeleft < 0) {
      this.closeAuc(data,win);
      return <h4 style={{fontWeight:"300"}}>Auction Ended</h4>;
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

  getBidsHistory = () => {
    const bidsref = firebase.database().ref("Bids");
    bidsref.on("value", (snapshot) => {
      const lists = snapshot.val();
      const list = [];
      for (let id in lists) {
        list.push(lists[id]);
      }
      this.setState({ lists: list });
    });
  };
  submitBid = () => {
    const bidsref = firebase.database().ref("Bids");
    const bid = {
      date: this.state.date,
      username: this.state.first_name + " " + this.state.last_name,
      price: this.state.price,
      item_id: this.props.item_id,
      user_id:this.state.user_id
    };
    if (this.state.balance > this.state.price) {
      bidsref.push(bid);
    } else {
      this.setState({ error: true });
    }
    this.setState({ price: "" });
  };
  render() {
    const data = this.state.images;
    let max = 0;
    const maxbids = this.state.lists;
    var c = new Object();
    c.longitude = this.state.longitude;
    c.latitude = this.state.latitude;
    c.area = this.state.area;
    c.starting_price = this.state.starting_price;
    this.state.coordinates.push(c);
    return (
      <div>
        <Navbar />
        <MDBRow class="h-100">
            
          <MDBCol md="10">
            
            <div className="details">
              <Gallery images={data} />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow style={{ marginRight: "70px" }}>
          <MDBCol md="8">
            <div className="bigrow">
              <h4>
                <i style={{ color: "grey" }}>Description </i>
              </h4>
              {this.state.description}
              <br />
              <hr />
              <h4>
                <i style={{ color: "grey" }}>Property Details </i>
              </h4>
              <br />
              <MDBRow>
                <MDBCol>
                  <p>
                    <MDBIcon icon="bed" style={{ color: "grey" }} /> Beds :{" "}
                    {this.state.bedrooms}{" "}
                  </p>
                  <p>
                    Electricity :{" "}
                    {this.state.electricity == "0" ? (
                      <MDBIcon icon="times" style={{ color: "grey" }} />
                    ) : (
                      <MDBIcon icon="check" style={{ color: "grey" }} />
                    )}{" "}
                  </p>
                </MDBCol>
                <MDBCol>
                  <p>
                    <MDBIcon icon="bath" style={{ color: "grey" }} /> Baths :{" "}
                    {this.state.bathrooms}
                  </p>
                  <p>
                    Elevator :{" "}
                    {this.state.elevator == "0" ? (
                      <MDBIcon icon="times" style={{ color: "grey" }} />
                    ) : (
                      <MDBIcon icon="check" style={{ color: "grey" }} />
                    )}{" "}
                  </p>
                </MDBCol>
                <MDBCol>
                  <p>
                    <MDBIcon icon="utensils" style={{ color: "grey" }} /> Dining
                    : {this.state.diningrooms}
                  </p>
                  <p>
                    Heating :{" "}
                    {this.state.heating_cooling == "0" ? (
                      <MDBIcon icon="times" style={{ color: "grey" }} />
                    ) : (
                      <MDBIcon icon="check" style={{ color: "grey" }} />
                    )}{" "}
                  </p>
                </MDBCol>
                <MDBCol>
                  <p>
                    <MDBIcon icon="door-open" style={{ color: "grey" }} />{" "}
                    Balcony : {this.state.Balcony}
                  </p>
                  <p>
                    Parking :{" "}
                    {this.state.parking > 0 ? (
                      <MDBIcon icon="times" style={{ color: "grey" }} />
                    ) : (
                      <MDBIcon icon="check" style={{ color: "grey" }} />
                    )}{" "}
                  </p>
                </MDBCol>
              </MDBRow>
              <br />
              <MDBRow>
                <MDBCol>
                  <i>
                    <strong style={{ color: "grey" }}>-</strong> Area :{" "}
                  </i>{" "}
                  {this.numberWithCommas(this.state.area)} sqft
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <i>
                    <strong style={{ color: "grey" }}>-</strong> Type :{" "}
                  </i>{" "}
                  {this.state.type}
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                  <MDBCol md="8">
                  <h4>
                    <i style={{ color: "grey" }}>Location </i>
                  </h4>
                  <br />
              <ViewOnMapd coordinates={this.state.coordinates}/>
              </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol>
                  <h4>
                    <i style={{ color: "grey" }}>Owner </i>
                  </h4>
                </MDBCol>
              </MDBRow>
              <MDBRow>
            
                <MDBCol>
                  <img
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                    }}
                    src={this.state.image}
                  />
                </MDBCol>
                <MDBCol>
                  <MDBIcon icon="signature" style={{ color: "grey" }} /> :{" "}
                  {this.state.first_name} {this.state.last_name}
                  <br />
                  <MDBIcon icon="envelope" style={{ color: "grey" }} /> :{" "}
                  {this.state.email} <br />
                  <MDBIcon icon="phone-alt" style={{ color: "grey" }} /> :{" "}
                  {this.state.phone}
                  <br />
                </MDBCol>
              </MDBRow>
              <hr />
            </div>
          </MDBCol>
          <MDBCol md="4" className="biding">
            <Card id="fix">
              <CardHeader
                style={{ backgroundColor: "whitesmoke", height: "80px" }}
              >
                <h4></h4>
                <h4>
                  <i style={{ color: "#32b69b" }}> Let's start bidding !</i>
                </h4>
              </CardHeader >
              <CardBody>
                <MDBCol>
                  <MDBRow>
                    <i>
                      <h6 style={{ color: "#32b69b", float: "left" }}>
                        Auction ends in :
                      </h6>
                    </i>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <h4 style={{ color: "grey" }}>{this.rendarTimeLaps()}</h4>
                    </MDBCol>
                  </MDBRow>
                  <br />
                  <MDBRow>
                    <i>
                      <h6 style={{ color: "#32b69b", float: "left" }}>
                        Bidding History
                      </h6>
                    </i>
                    {maxbids.map((i, ind) => {
                      if (i.item_id == this.state.id)
                        return (
                          <MDBRow id={ind}>
                            <i id={ind} style={{ color: "white" }}>,,,,,,,</i>
                            <>{i.username}</>{" "}
                            <i id={ind} style={{ color: "white" }}>,,,,,,,</i>{" "}
                            {this.numberWithCommas(i.price)} $
                          </MDBRow>
                        );
                    })}
                  </MDBRow>
                  <br />
                  <MDBRow>
                    <h6>
                      <i style={{ color: "#32b69b" }}>Starting Bid</i>
                    </h6>
                    <h6>
                      <i style={{ color: "#32b69b", marginLeft: "40px" }}>
                        Current Bid
                      </i>
                    </h6>
                  </MDBRow>
                  <MDBRow>
                    <h5>
                      ${this.numberWithCommas(this.state.starting_price)}+
                    </h5>
                    {maxbids.map((i, ind) => {
                      if (i.item_id == this.state.id)
                        if (i.price > max){ max = i.price; win=i.username;}
                    })}
                    <h5 style={{ marginLeft: "30px" }}>
                      ${this.numberWithCommas(max)}
                    </h5>
                  </MDBRow>
                  <br />
                </MDBCol>
                <AddBidD item_id={this.state.id} />
              </CardBody>
            </Card>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}
export default ItemDetails;
