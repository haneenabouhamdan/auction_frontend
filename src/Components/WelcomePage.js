import React from "react";
import Navbar from "../Components/Navbar";
import CountBids from "../Components/CountBids";
import welcome from "../images/welcome.jpeg";
import { MDBIcon } from "mdbreact";
import "../style/MyAuctions.css";
import MainCategories from "./MainCategories";
import firebase from "../utils/firebase";
import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import axios from "axios";
let win = "";
class welcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
      auctions: [],
      lists: [],
      fl: true,
      num: 0,
      last_name:"",
      first_name:"",
      itemslist:[],
    };
  }
  
  async componentDidMount() {
    axios.defaults.withCredentials=true;
     await   axios.get('/api/user').then((response)=>{
      console.log(response)
       this.setState({
        first_name:response.data.first_name,
        last_name:response.data.last_name,
        user_id:response.data.id,
       })
      })
     
    await this.getAuctions();
    await this.getBidsHistory();
  }
  getAuctions() {
    axios.defaults.withCredentials = true;
    axios.get("/api/getUserAuctions").then((res) => {
      console.log(res.data.items);
      this.setState({ auctions: res.data.items });
    });
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  getBidsHistory = () => {
    const bidsref = firebase.database().ref("Bids");
    bidsref.on("value", (snapshot) => {
      const lists = snapshot.val();
      const list = [];
      for (let id in lists) {
        list.push(lists[id]);
      }
      // this.setState({ lists: list });
      const items = [];
      list.map((i)=>{
        if(i.user_id==this.state.user_id)
        items.push(i.item_id);
      })
      // console.log(items.length)
      this.setState({itemslist:items})
    });
  };
// getItemsById=()=>{
//   let formData={
//     data:this.state.itemslist,
//     n:this.state.itemslist.length
//   }
//   axios.defaults.withCredentials = true;
//   axios.post("/api/getItemsById",formData).then((res) => {
//     console.log(res)
// }
//   )
// }
  rendarTimeLaps(item) {
    var now = new Date().getTime();
    var countDownDate = new Date(item.planned_close_date).getTime();
    var timeleft = countDownDate - now;
    if (timeleft < 0) {
      // this.closeAuc(item.id,win);
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
  forcerender = () => {
    setInterval(() => {
      this.setState({
        fl: !this.state.fl,
      });
    }, 3000);
  };
  renderItems() {
    const data = this.state.auctions;
    let max = 0,ind=0;
    const maxbids = this.state.lists;
    return(
    <Row>
  
      {data.map((item, index) => (
          <Row className="xsmall" key={index}>
            <Col>
              <img className="cover" src={item.auction_images[0].path} />
            </Col>
            <Col>
              {item.auction_categories_id === 1 ? (
                <i>Residential</i>
              ) : item.auction_categories_id === 2 ? (
                <i>Commercial</i>
              ) : item.auction_categories_id === 3 ? (
                <i>Industrial</i>
              ) : (
                <i>Any</i>
              )}
              <br />
              {item.type}
            </Col>
            <Col>
              <i>{item.area} sqft </i>
              <br />
              {this.rendarTimeLaps(item)}
            </Col>
            <Col>
              <CountBids id={item.id} /> bids <br />
              {maxbids.map((i, ind) => {
                if (i.item_id == item.id)
                  if (i.price > max) {
                    max = i.price;
                    win = i.username;
                    ind=ind;
                  }
              })}
              <h6 style={{ marginLeft: "5px" }} id={ind}>
                {" "}
                $ {this.numberWithCommas(max)}
              </h6>
            </Col>
          </Row>
        ))}
    </Row>
    )
  }
  
  render() {
    const data = this.state.auctions;
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
          <h2 style={{ color: "transparent" }}>nbkn</h2>
          <div className="boxSearch">
            <h6 style={{ color: "transparent" }}>nbkn</h6>
            <h1>
              <strong>Bid, Win and Close with confidence !! </strong>
            </h1>
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
        <hr />

        <div style={{ padding: "20px", marginLeft: "30px" }}>
          <Row className="row">
            <Col className="MCol">
              <Card className="lCard">
                <CardHeader
                  style={{ backgroundColor: "white", height: "80px" }}
                >
                  <h3>Your Activities</h3>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>Active Auctions</Col>
                  </Row>
                  {data && this.renderItems()}
                </CardBody>
              </Card>
            </Col>
            {/* </Row> */}
            <Col className="MCol">
              <Card className="lCard">
                <CardHeader
                  style={{ backgroundColor: "white", height: "80px" }}
                >
                  <h3>Recomended for you </h3>
                </CardHeader>
                <CardBody></CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default welcomePage;
