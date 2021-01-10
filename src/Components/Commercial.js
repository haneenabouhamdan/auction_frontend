import React from "react";
import axios from "axios";
import Slideshow from "./Slideshow";
import Pagination from "react-js-pagination";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Redirect } from 'react-router';

import "../App.css";
import { Multiselect } from "multiselect-react-dropdown";
import { DropdownButton, Dropdown } from "react-bootstrap";
import firebase from "../utils/firebase";
import Navbar from "../Components/Navbar";
import AddBid from "./AddBid";
import Details from "./Details";
import { MDBIcon } from "mdbreact";
import ViewOnMap from "./ViewOnMap";
class ComItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bids: [],
      activePage: 0,
      total: 0,
      per_page: 0,
      item_id: 0,
      coordinates: [],
      lists: [],
      user: "",
      setOpenDet: false,
      item: "",
      category: 0,
      area_min: 0,
      area_max: 0,
      Services: "",
      fl: true,
      services: [],
      types: [],
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

  async getAllItems(pageNumber) {
    this.handlePageChange(pageNumber);
    axios.defaults.withCredentials = true;
    await axios
      .get(`/api/getCommercialItems?page=${pageNumber}`)
      .then((res) => {
        const coor = res.data.items.data;
        coor.map((item) => {
          var c = new Object();
          c.longitude = item.longitude;
          c.latitude = item.latitude;
          c.area = item.area;
          c.starting_price=item.starting_price;
          //  console.log(c)
          this.state.coordinates.push(c);
        });
        // console.log(res)
        this.setState({
          bids: res.data.items.data,
          per_page: res.data.items.per_page,
          total: res.data.items.total,
          activePage: res.data.items.current_page,
        });
      });
    // console.log(this.state.user)
  }
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
   this.props.history.push('/itemDetails/'.concat(item.id))

  };
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
            <MDBRow className="items" onClick={()=>this.handleClickOpenDet(item)}>
              <MDBCol md="4">
                <Slideshow className="images" images={item.auction_images} />
              </MDBCol>
             
              <MDBCol md="8" className="prop">
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
                <MDBRow>
                  <h5 style={{ color: "grey", marginLeft: "15px"}}>{this.rendarTimeLaps(item)}</h5>
                </MDBRow>
                <MDBRow style={{marginTop:"20px"}} > </MDBRow>
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
                <MDBRow><p></p></MDBRow>
                
                <MDBRow>
                <MDBCol className="bidss">
                  <i>Starting Bid</i><br/>
                  <h6 style={{marginLeft:"5px"}}> ${this.numberWithCommas(item.starting_price)}+</h6>
                  </MDBCol>
                  <MDBCol className="bidss">
                  <i>Current Bid</i><br/>
                    {maxbids.map((i,ind) => {
                      if(i.item_id ==item.id)
                       if(i.price > max) max=i.price;
                    })}
                    <h6 style={{marginLeft:"5px"}} id={index.ind}> $ {this.numberWithCommas(max)}</h6>
             
                  </MDBCol>
                  <MDBCol>
                  <i>Your Bid</i><br/>
                  <AddBid item_id={item.id}/>
                  </MDBCol>
                </MDBRow>
                <hr style={{height:"3px",color:"grey"}}/>
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
  handleOnchange = (val) => {
    this.setState({ Services: val });
  };
  handleSelectcat = (e) => {
    switch (e) {
      case "1":
        this.setState({ category: 0 });
        break;
      case "2":
        this.setState({ category: 1 });
        break;
      case "3":
        this.setState({ category: 2 });
        break;
    }
  };
  handleSelectbaths = (e) => {
    // console.log(e)
    switch (e) {
      case "1":
        this.setState({ baths: -1 });
        break;
      case "2":
        this.setState({ baths: 1 });
        break;
      case "3":
        this.setState({ baths: 2 });
        break;
      case "4":
        this.setState({ baths: 3 });
        break;
      case "5":
        this.setState({ baths: 4 });
        break;
    }
  };
  handleSelectbeds = (e) => {
    // console.log(e)
    switch (e) {
      case "1":
        this.setState({ beds: -1 });
        break;
      case "2":
        this.setState({ beds: 1 });
        break;
      case "3":
        this.setState({ beds: 2 });
        break;
      case "4":
        this.setState({ beds: 3 });
        break;
      case "5":
        this.setState({ beds: 4 });
        break;
      case "6":
        this.setState({ beds: 5 });
        break;
    }
  };
  handleSelectarea = (e) => {
    // console.log(e)
    switch (e) {
      case "1":
        this.setState({ area_min: -1, area_max: -1 });
        break;
      case "2":
        this.setState({
          area_min: 1000,
          area_max: 5500,
        });
        break;
      case "3":
        this.setState({
          area_min: 5500,
          area_max: 10800,
        });
        break;
      case "4":
        this.setState({
          area_min: 10800,
          area_max: 5500,
        });
        break;
      case "5":
        this.setState({
          area_min: 16200,
          area_max: 80000,
        });
        break;
    }
  };
  handleClickL() {
    var x = document.getElementById("ddropdowntyypee");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  handleClickH() {
    var x = document.getElementById("ddropdowntyypee");
    if (x.style.display === "none") {
      x.style.display = "block";
    }
  }
  render() {
    const bids = this.state;
    const  objectArray= [
      { key: "Any", cat: "Any" },
      { key: "Appartments/Studios", cat: "Appartments/Studios" },
      { key: "Industrial Buildings", cat: "Industrial Buildings" },
      { key: "Houses", cat: "Houses" },
      { key: "Villas", cat: "Villas" },
      { key: "Buildings", cat: "Buildings" },
      { key: "Bungalows", cat: "Bungalows" },
      { key: "Offices", cat: "Offices" },
      { key: "Shops", cat: "Shops" },
    ];
    const  objtArray= [
      { key: "Any", cat: "Any" },
      { key: "Electricity", cat: "electricity" },
      { key: "Elevator", cat: "elevator" },
      { key: "Parking", cat: "parking" },
    ];
    return (
      <div class="h-100">
        <header>
          <Navbar />
        </header>
        <MDBRow  class="h-100">
          <MDBCol md="8" >
          <div className="filters"> 
                <DropdownButton  title="category" id="category" onSelect={()=>this.handleSelectcat}> 
                    <Dropdown.Item eventKey="1"><button className="removv" onClick={this.handleClickH}>House</button></Dropdown.Item>
                    <Dropdown.Item eventKey="2"><button className="removv" onClick={this.handleClickL}>Land</button></Dropdown.Item> 
                    <Dropdown.Item eventKey="3"><button className="removv" onClick={this.handleClickA}>any</button></Dropdown.Item> 
                    </DropdownButton>
                    <DropdownButton  title="Area" id="area" onSelect={this.handleSelectarea}>
                   <Dropdown.Item eventKey="1">Any</Dropdown.Item>
                    <Dropdown.Item eventKey="2">1000 - 5500  sqft</Dropdown.Item>
                    <Dropdown.Item eventKey="3">5500 - 10800 sqft</Dropdown.Item> 
                    <Dropdown.Item eventKey="4">10800 - 16200  sqft</Dropdown.Item>
                    <Dropdown.Item eventKey="5">16200 +  sqft</Dropdown.Item>
                    </DropdownButton>
                    <div id="rooms">
                   <DropdownButton  title="Baths" id="bd" onSelect={this.handleSelectbaths}> 
                   <Dropdown.Item eventKey="1">Any</Dropdown.Item>
                    <Dropdown.Item eventKey="2">1+</Dropdown.Item>
                    <Dropdown.Item eventKey="3">2+</Dropdown.Item> 
                    <Dropdown.Item eventKey="4">3+</Dropdown.Item>
                    <Dropdown.Item eventKey="5">4+</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton  title="Beds" id="bd"  onSelect={this.handleSelectbeds}> 
                    <Dropdown.Item eventKey="1">Any</Dropdown.Item>
                    <Dropdown.Item eventKey="2">1+</Dropdown.Item>
                    <Dropdown.Item eventKey="3">2+</Dropdown.Item> 
                    <Dropdown.Item eventKey="4">3+</Dropdown.Item>
                    <Dropdown.Item eventKey="5">4+</Dropdown.Item> 
                    <Dropdown.Item eventKey="6">5+</Dropdown.Item> 
                    </DropdownButton>
                    </div>
          </div>
          <div style={{display:"flex",width:"800px"}}>
          <div className="type" >
                    <Multiselect
                      options={objectArray}
                      displayValue="key"
                      style={this.style}
                      showCheckbox={true}
                      placeholder="Type"
                      onSelect={(selectedList, selectedItem)=>{
                        this.setState({
                          types: selectedList
                        })
                      }}
                      onRemove={(selectedList, removedItem)=>{
                        this.setState({
                          services: selectedList
                        })
                      }}
                    />
                </div>
                <div className="services" >
                    <Multiselect
                      options={objtArray}
                      displayValue="key"
                      style={this.style}
                      showCheckbox={true}
                      placeholder="Services"
                      onSelect={(selectedList, selectedItem)=>{
                        this.setState({
                          services: selectedList
                        })
                      }}
                      onRemove={(selectedList, removedItem)=>{
                        this.setState({
                          services: selectedList
                        })
                      }}
                    />
                    </div>
                    <button className="searchbtn"><MDBIcon icon="search" /> Search</button>
                    </div>
                    <hr />
          <div style={{height:"400px" ,marginTop:"20px",overflowY:"scroll"}}>
            {bids && this.renderItems()}
            </div>
            </MDBCol>
            
          <MDBCol md="4" className="maps">
            <ViewOnMap coordinates={this.state.coordinates} className={this.state.visible?'fadeIn':'fadeOut'}/>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}
export default ComItems;
