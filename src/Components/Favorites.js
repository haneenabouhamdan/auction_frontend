import React from "react";
import axios from "axios";
import Slideshow from "./Slideshow";
import Pagination from "react-js-pagination";
import "../style/MyAuctions.css";
import firebase from "../utils/firebase";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import AddBid from "./AddBid";
import UserSidebar from "./UserSidebar";
import { MDBIcon } from "mdbreact";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favbids: [],
      setOpen: false,
      setOpenL: false,
      activePage: 0,
      total: 0,
      per_page: 0,
      lists: [],
      setOpenDet: false,
      fl: true,
    };
    this.rendarTimeLaps = this.rendarTimeLaps.bind(this);
  }
  addImage = (file) => {
    this.setState({
      image: file[0],
    });
  };
  handleClickOpen = () => {
    this.setState({ setOpen: true });
  };
  closeDialogDet = () => {
    this.setState({ setOpenDet: false });
  };
  closeDialog = () => {
    this.setState({ setOpen: false });
  };
  handleClickOpenL = () => {
    this.setState({ setOpenL: true });
  };
  closeDialogL = () => {
    this.setState({ setOpenL: false });
  };
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
    await this.getUserFavItems();
    await this.getBidsHistory();
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  async getUserFavItems(pageNumber = 1) {
    this.handlePageChange(pageNumber);
    axios.defaults.withCredentials = true;
    await axios.get(`/api/getFav?page=${pageNumber}`).then((res) => {
      this.setState({
        favbids: res.data.items.data,
        per_page: res.data.items.per_page,
        total: res.data.items.total,
        activePage: res.data.items.current_page,
      });
    });
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
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  getBidsHistory = () => {
    const bidsref = firebase.database().ref("Bids");
    bidsref.on("value", (snapshot) => {
      const lists = snapshot.val();
      const list = [];
      for (let id in lists) {
        list.push(lists[id]);
      }
      // console.log(list)
      this.setState({ lists: list });
    });
  };
  handleClickOpenDet = (item) => {
    console.log("test");
    this.setState({ setOpenDet: true, item: item });
  };
  remFav = (id) => {
    let formData = {
      auction_id: id,
    };
    axios.defaults.withCredentials = true;
    axios.post(`/api/remFav`, formData).then((res) => {
      console.log(res);
    });
    window.location.reload();
  };
  renderUserItems() {
    const data = this.state.favbids;
    const active = this.state.activePage;
    let max = 0;
    const maxbids = this.state.lists;

    return (
      <React.Fragment>
        <div>
          {data.map((item, index) => (
            <MDBRow
              className="items"
              onClick={() => this.handleClickOpenDet(item)}
            >
              <MDBCol md="4">
                <Slideshow className="images" images={item.auction_images} />
              </MDBCol>

              <MDBCol md="8" className="prop">
                <MDBRow>
                  <button
                    type="submit"
                    className="favo"
                    onClick={() => this.remFav(item.id)}
                  >
                    <MDBIcon fas icon="minus-circle" />
                  </button>
                </MDBRow>
                <MDBRow>
                  <h5 style={{ color: "grey", marginLeft: "15px" }}>
                    {this.rendarTimeLaps(item)}
                  </h5>
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
                        if (i.price > max) max = i.price;
                    })}
                    <h6 style={{ marginLeft: "5px" }} id={index.ind}>
                      {" "}
                      $ {this.numberWithCommas(max)}
                    </h6>
                  </MDBCol>
                  <MDBCol>
                    <i>Your Bid</i>
                    <br />
                    <AddBid item_id={item.id} />
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
              this.getAllItems(pageNumber);
            }}
          />
        </div>
      </React.Fragment>
    );
  }
  render() {
    const bids = this.state;
    if (this.state.favbids.length < 0) {
      return <div></div>;
    }
    return (
      <div class="h-100">
        <MDBRow class="h-100">
          <MDBCol md="2">
            <UserSidebar />
          </MDBCol>
          <MDBCol md="9">
            <div>sorting</div>
            <div style={{ marginTop: "20px", marginLeft: "50px" }}>
              {bids && this.renderUserItems()}
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}
export default Favorites;
