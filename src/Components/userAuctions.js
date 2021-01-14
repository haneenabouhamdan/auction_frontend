import React from "react";
import axios from "axios";
import Slideshow from "./Slideshow";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "../App.css";
import firebase from "../utils/firebase";
import Navbar from "../Components/Navbar";
import { MDBIcon } from "mdbreact";
import UserSidebar from "./UserSidebar";
let win = 0;
class UserItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bids: [],
      activePage: 0,
      total: 0,
      per_page: 0,
      OpenDet: false,
      fl: true,
      item: [],
      lists: [],
      closed: false,
      winner_name: "",
      winner_email: "",
      owner_email: "",
      owner_tel: "",
      owner_name: "",
      location: "",
      feedback: "",
      send_to: "",
      to_name: "",
      name: "D.P.M",
      email: "DPM@gmail.com",
    };

    this.rendarTimeLaps = this.rendarTimeLaps.bind(this);
  }
  async componentDidMount() {
    await this.getAllItems();
    await this.getBidsHistory();
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  logout = (e) => {
    e.preventDefault();
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/logout").then((res) => {
        sessionStorage.removeItem("loggedIn");
        this.props.history.push("/login");
      });
    });
  };
  async componentDidMount() {
    await this.getOwner();
    await this.getUserItems();
    await this.getBidsHistory();
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  handleClickOpen = () => {
    this.props.history.push("/home");
  };
  handleClickOpenL = () => {
    this.props.history.push("/land");
  };
  countDownDate(date) {
    return new Date(date).getTime();
  }
  remAuc = (id) => {
    let formData = {
      auction_id: id,
    };
    axios.defaults.withCredentials = true;
    axios.post(`/api/remAuc`, formData).then((res) => {
      window.location.reload();
    });
  };
  // getUserByFullName(name) {
  //   let str = name.split(" ");
  //   this.setState({ winner_name: name });
  //   let formData = {
  //     fname: str[0],
  //     lname: name.slice(name.indexOf(" ")),
  //   };
  //   axios.defaults.withCredentials = true;
  //   axios.post(`/api/getUserByFullname`, formData).then((res) => {
  //     // console.log(res.data.email[0].email)
  //     this.setState({ winner_email: res.data.email[0].email });
  //     // console.log(this.state.winner_email)
  //   });
  // }
  getOwner = () => {
    axios.defaults.withCredentials = true;
    axios.get(`/api/user`).then((res) => {
      this.setState({
        owner_email: res.data.email,
        owner_name: res.data.first_name + " " + res.data.last_name,
        owner_tel: res.data.phone,
        location: res.data.country + "," + res.data.state,
      });
    });
  };
  sendFeedback(templateId, variables) {
    window.emailjs
      .send("service_02w05dq", templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }
  async closeAuc(id) {
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
    await this.getMailById(win);
    axios.defaults.withCredentials = true;
    await axios.post(`/api/closeAuc`, formData).then((res) => {
    });
   await this.sendemail();
  }
  getMailById = (id) => {
    axios.defaults.withCredentials = true;
    axios.get(`/api/getEmail/`.concat(id)).then((res) => {
      
      this.setState({winner_email:res.data.email[0].email})
    });
  };
 async sendemail  () {
  
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
  };
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
  addImage = (file) => {
    this.setState({
      image: file[0],
    });
  };
  style = {
    chips: {
      background: "#32b69b",
    },
    searchBox: {
      "border-bottom": "1px solid lightgrey",
      "border-radius": "2px",
      height: "50px",
      color: "grey",
      "font-weight": "200",
    },
    multiselectContainer: {
      color: "grey",
    },
  };
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  countDownDate(date) {
    return new Date(date).getTime();
  }
  handleClickOpenDet = (item) => {
    console.log(item);
    this.props.history.push("/itemDetails/".concat(item.id));
  };

  forcerender = () => {
    setInterval(() => {
      this.setState({
        fl: !this.state.fl,
      });
    }, 3000);
  };
  async getUserItems(pageNumber) {
    //  console.log(pageNumber)
    this.handlePageChange(pageNumber);
    axios.defaults.withCredentials = true;
    await axios.get(`/api/getUserAuctions?page=${pageNumber}`).then((res) => {
      console.log(res);
      this.setState({
        bids: res.data.items,
        per_page: res.data.items.per_page,
        total: 1,
        activePage: res.data.items.current_page,
      });
    });
  }
  rendarTimeLaps(item) {
    var now = new Date().getTime();
    var countDownDate = new Date(item.planned_close_date).getTime();
    var timeleft = countDownDate - now;
    if (timeleft < 0) {
      this.closeAuc(item.id, win);
      return "Auction Closed";
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
  closeDialogDet = () => {
    this.setState({ setOpenDet: false });
  };

  renderItems() {
    const data = this.state.bids;
    let max = 0;
    const maxbids = this.state.lists;
    return (
      <React.Fragment>
        <div>
          {data.map((item, index) => (
            <MDBRow className="items" key={index}>
              <MDBCol md="4" onClick={() => this.handleClickOpenDet(item)} >
                <Slideshow className="images" images={item.auction_images} />
              </MDBCol>

              <MDBCol md="8" className="prop">
                <MDBRow>
                  <button
                    type="submit"
                    className="favo"
                    onClick={() => this.remAuc(item.id)}
                  >
                    <MDBIcon icon="trash" />
                  </button>
                </MDBRow>
                <MDBRow>
                  {item.actual_close_date ? (
                    <h5 style={{ color: "grey", marginLeft: "15px" }}>
                      Auction Closed
                    </h5>
                  ) : (
                    <h5 style={{ color: "grey", marginLeft: "15px" }}>
                      {this.rendarTimeLaps(item)}
                    </h5>
                  )}
                </MDBRow>
                <MDBRow style={{ marginTop: "20px" }}> </MDBRow>
                {item.bedrooms > 0 ? (
                  <div className="flex">
                    {item.bedrooms} Beds <strong>. </strong>
                  </div>
                ) : (
                  <></>
                )}
                {item.bathrooms > 0 ? (
                  <div className="flex">
                    {item.bathrooms} Baths <strong>. </strong>
                  </div>
                ) : (
                  <></>
                )}
                {item.diningrooms > 0 ? (
                  <div className="flex">
                    {item.diningrooms} Dinings <strong>. </strong>
                  </div>
                ) : (
                  <></>
                )}
                {item.parking > 0 ? (
                  <div className="flex">
                    {item.parking} Parking <strong>. </strong>
                  </div>
                ) : (
                  <></>
                )}
                {item.area > 0 ? (
                  <div className="flex">
                    {this.numberWithCommas(item.area)} sqft{" "}
                  </div>
                ) : (
                  <></>
                )}
                <MDBRow>
                  <div className="servic">
                    {this.state.elevator == "0" ? " " : " elevator "}
                    <strong> . </strong>
                    {this.state.heating_cooling == "0"
                      ? " "
                      : " heating and cooling "}
                    <strong> . </strong>
                    {this.state.electricity == "0" ? " " : " electricity "}
                  </div>
                </MDBRow>
                <MDBRow>
                  <p></p>
                </MDBRow>

                <MDBRow>
                  <MDBCol className="bidss">
                    <i>Starting Bid</i>
                    <br />
                    <h6 style={{ marginLeft: "5px" }}>
                      {" "}
                      ${this.numberWithCommas(item.starting_price)}+
                    </h6>
                  </MDBCol>
                  <MDBCol className="bidss">
                    <i>Current Bid</i>
                    <br />
                    {maxbids.map((i, ind) => {
                      if (i.item_id == item.id)
                        if (i.price > max) {
                          max = i.price;
                          win = i.user_id;
                        }
                    })}
                    <h6 style={{ marginLeft: "5px" }} id={index.ind}>
                      {" "}
                      $ {this.numberWithCommas(max)}
                    </h6>
                  </MDBCol>
                  <MDBCol>
                    {item.actual_close_date === null ? (
                      <button
                        type="submit"
                        onClick={() => this.closeAuc(item.id)}
                        className="close"
                      >
                        <MDBIcon icon="gavel" /> Close Auction{" "}
                      </button>
                    ) : (
                      <p>{/* Auction Closed :<></> */}</p>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr style={{ height: "3px", color: "grey" }} />
              </MDBCol>
            </MDBRow>
          ))}
        </div>
        <div className="pag">
          <Pagination
            activePage={this.state.current_page}
            itemsCountPerPage={this.state.per_page}
            totalItemsCount={this.state.total}
            pageRangeDisplayed={5}
            itemClass="page-item"
            linkClass="page-link"
            onChange={(pageNumber) => {
              this.getUserItems(pageNumber);
            }}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    const bids = this.state;

    return (
      <div class="h-100">
        <MDBRow class="h-100">
          <MDBCol md="2">
            <UserSidebar />
          </MDBCol>
          <MDBCol md="9">
            <MDBRow>
              <DropdownButton
                title="Create Auction"
                id="create"
                style={{ marginLeft: "10px" }}
              >
                <Dropdown.Item href="">
                  <a
                    href="/home"
                    className="drop"
                    onClick={this.handleClickOpen}
                  >
                    Buildings
                  </a>
                </Dropdown.Item>
                <Dropdown.Item href="">
                  <a
                    href="/land"
                    className="drop"
                    onClick={this.handleClickOpenL}
                  >
                    Lands
                  </a>
                </Dropdown.Item>
              </DropdownButton>
            </MDBRow>
            <div style={{ marginTop: "20px", marginLeft: "50px" }}>
              {this.renderItems()}
            </div>
          </MDBCol>
        </MDBRow>
        {/* <div>
          <MDBIcon icon="sign-alt-out" style={{backgroundColor:"black",
          height:"50px",marginLeft:"500px"
        }} onClick={this.logout}/>
        </div> */}
      </div>
    );
  }
}
export default UserItems;
