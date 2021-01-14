import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { Multiselect } from "multiselect-react-dropdown";
import { DropdownButton, Dropdown } from "react-bootstrap";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../style/User.css";
import "../style/Sidebar.css";
import UserSidebar from "./UserSidebar";
// reactstrap components
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
import ListCountries from "./ListCountries";
import { MDBIcon } from "mdbreact";
import SearchableMap from "./Mymap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      image: "",
      last_name: "",
      phone: "",
      password: "",
      balance: "",
      date_of_birth: "",
      email: "",
      country: "",
      state: "",
      openD: false,
      numFavBids: "",
      category: "a",
      longitude: "a",
      latitude: "a",
      area: "a",
      type: "a",
      numBids: "",
      interests:[],
      password_confirmation: "",
    };
  }
  componentDidMount() {
    this.getcount();
    this.getInterest();
    this.getfavcount();
    axios.defaults.withCredentials = true;
    axios.get("/api/user").then((response) => {
      this.setState({
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email,
        password: response.data.password,
        phone: response.data.phone,
        country: response.data.coutry,
        state: response.data.state,
        balance: response.data.balance,
        date_of_birth: response.data.date_of_birth,
        image: response.data.image,
      });
    });
    
  }
  handlechangeall = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
  ChangePic = () => {
    //dialog containing input file
    this.setState({
      openD: true,
    });
  };
  onChangeRegion = (val) => {
    // console.log(val);
    this.setState({
      state: val,
    });
  };
  onChangeCountry = (val) => {
    this.setState({
      country: val,
    });
  };

  addImage = (file) => {
    this.setState({
      image: file[0],
    });
  };
  handleClose = () => {
    this.setState({ openD: false });
  };
  onSubmit = (evt) => {
    evt.preventDefault();
    const fd = new FormData();
    fd.append("image", this.state.image);
    axios.defaults.withCredentials = true;
    axios.post("/api/editImage", fd).then((res) => {
      // alert.name="res.message"
    });
    this.handleClose();
  };
  getcount = () => {
    axios.defaults.withCredentials = true;
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.get("/api/getCount").then((res) => {
        // console.log(res.data);
        this.setState({ numBids: res.data.item });
      });
    });
  };
  getfavcount = () => {
    axios.defaults.withCredentials = true;
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.get("/api/getFavCount").then((res) => {
        // console.log(res.data);
        this.setState({ numFavBids: res.data.item });
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
  onChangelong = (e) => {
    this.setState({ longitude: e });
  };
  onChangelat = (e) => {
    this.setState({ latitude: e });
  };
  editProfile(){
    // console.log("hi")
    let formData1 = {
      fist_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      balance: this.state.balance,
      country: this.state.country,
      state: this.state.state,
      date_of_birth: this.state.date_of_birth,
    };
    axios.defaults.withCredentials = true;
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios.post("/api/users/edit", formData1).then((response) => {
        console.log(response);
      });
    });
  };
  addInterests=()=> {
    // console.log(this.state.category)
    let formData = {
      category: this.state.category,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      area: this.state.area,
      type: this.state.type,
    };
    axios.defaults.withCredentials = true;
    axios.post("/api/addInterest", formData).then((res) => {
      console.log(res);
    });
    this.showadd();
  }
  getInterest=()=>{
    const data=[];
    axios.defaults.withCredentials=true;
    axios.get('/api/getInterests').then((res)=>{

     
      const list = [];
      for (let id in res.data.items) {
        list.push(res.data.items[id]);
      }
      
     
      this.setState({ interests: list });
      console.log(this.state.interests)
    })
  }
  showadd() {
    var x = document.getElementById("vis");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  handleSelectcat = (e) => {
    switch (e) {
      case "1":
        this.setState({"category": 0 });
        break;
      case "2":
        this.setState({"category": 1 });
        break;
      case "3":
        this.setState({"category": 2 });
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
          area: 1000 //min
        });
        break;
      case "3":
        this.setState({
          area: 5500 //min
       
        });
        break;
      case "4":
        this.setState({
          area: 10800 //min
        });
        break;
      case "5":
        this.setState({
          area: 16200 //min
        });
        break;
    }
  };
  del(id){
    let form={
      "id":id
    }
    axios.defaults.withCredentials=true;
    axios.post('/api/deleteInterest',form).then((res)=>
    console.log(res))
  }
  render() {
    const data=this.state.interests;
    if (sessionStorage.getItem("loggedIn")) {
      const objectArray = [
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

      return (
        <div className="editProfile">
          <Row className="row">
            <UserSidebar />
            <Col>
              <Card className="smallCard">
                <CardHeader
                  style={{ backgroundColor: "white", height: "280px" }}
                >
                  <img className="image" src={this.state.image} />

                  <Dialog
                    open={this.state.openD}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogContent style={{ width: "250px", height: "150px" }}>
                      <input
                        onChange={(e) => this.addImage(e.target.files)}
                        type="file"
                        id="image"
                        ref="productimage"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} id="dialogAct">
                        Cancel
                      </Button>
                      <Button onClick={this.onSubmit} id="dialogAct">
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Row>
                    <Col>
                      <a onClick={this.ChangePic}>
                        <label style={{ fontSize: "12px" }}>
                          Change Profile Picture
                        </label>
                      </a>
                      <br />
                      <label>
                        {this.state.first_name} {this.state.last_name}
                      </label>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody style={{ height: "50px" }}>
                  <Row>
                    <Col>
                      <MDBIcon icon="gavel" style={{ color: "#804000" }} /> My
                      Items
                    </Col>
                    <Col>
                      <MDBIcon icon="trophy" style={{ color: "#ffbb33" }} /> Won
                      Bids
                    </Col>
                    <Col>
                      <MDBIcon icon="heart" style={{ color: "red" }} />{" "}
                      Favorites
                    </Col>
                  </Row>
                  <Row>
                    <Col>{this.state.numBids}</Col>
                    <Col>0</Col>
                    <Col>{this.state.numFavBids}</Col>
                  </Row>
                </CardBody>
                <button id="btn-logout" onClick={this.logout}>
                  Logout
                </button>
              </Card>
              <Card className="smallCaard">
                <CardHeader style={{ backgroundColor: "white" }}>
                  <CardTitle tag="h5">Interests</CardTitle>
                </CardHeader>

                <h6 style={{ height: "20px" }}>
                  <MDBIcon
                    icon="plus"
                    onClick={this.showadd}
                    style={{
                      width: "30px",
                      marginTop: "10px",
                      marginLeft: "300px",
                      backgroundColor: "white",
                      color: "#32b69b",
                    }}
                  />
                </h6>

                <CardBody>
                  <div id="vis" style={{ display: "none" }}>
                    <Row>
                      <SearchableMap
                        longitude={this.onChangelong}
                        latitude={this.onChangelat}
                      />
                      <DropdownButton
                        title="Home Type"
                        id="categry"
                        onSelect={(selectedList, selectedItem) => {
                          this.setState({
                            type: selectedList,
                          });
                        }}
                        onRemove={(selectedList, removedItem) => {
                          this.setState({
                            type: selectedList,
                          });
                        }}
                      >
                        <Dropdown.Item eventKey="1">
                          Appartments/Studios
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                          Industrial Buildings
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="3">Houses</Dropdown.Item>
                        <Dropdown.Item eventKey="4">Villas</Dropdown.Item>
                        <Dropdown.Item eventKey="5">Buildings</Dropdown.Item>
                        <Dropdown.Item eventKey="6">Bungalows</Dropdown.Item>
                        <Dropdown.Item eventKey="7">Offices</Dropdown.Item>
                        <Dropdown.Item eventKey="8">Shops</Dropdown.Item>
                      </DropdownButton>
                    
                    </Row>
                    <Row>
                      <div className="filter">
                        <DropdownButton
                          title="category"
                          name="category"
                          id="categry"
                          onSelect={() => this.handleSelectcat}
                        >
                          <Dropdown.Item eventKey="1">House</Dropdown.Item>
                          <Dropdown.Item eventKey="2">Land</Dropdown.Item>
                          <Dropdown.Item eventKey="3">any</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                          title="Area"
                          id="ara"
                          onSelect={this.handleSelectarea}
                        >
                          <Dropdown.Item eventKey="1">Any</Dropdown.Item>
                          <Dropdown.Item eventKey="2">
                            1000 - 5500 sqft
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="3">
                            5500 - 10800 sqft
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="4">
                            10800 - 16200 sqft
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="5">
                            16200 + sqft
                          </Dropdown.Item>
                        </DropdownButton>
                       
                        <button
                          onClick={this.addInterests}
                          style={{ height: "30px", marginTop: "10px" }}
                        >
                          Add
                        </button>
                      </div>
                    </Row>
                  
                  </div>
                  <Row> 
                  <Col style={{color:"#32b69b"}}>Category</Col>
                      <Col style={{color:"#32b69b"}}>Type</Col>
                      <Col style={{color:"#32b69b"}}>Area</Col>
                      <Col style={{color:"#32b69b"}}>Location</Col>
                      <Col></Col>
                    </Row>
                    <Row>
                    {data.map((i,ind)=>
                   
                      <Row id={ind} style={{marginLeft:"7px"}}>
                        {i.category == null ?<Col style={{width:"110px"}}>-</Col>:
                        i.category=='1'?
                        <Col style={{width:"110px"}}>Houses</Col>:
                        <Col>-</Col>}
                        {i.type == null ?<Col style={{width:"110px"}}>-</Col>:
                        i.type=='1'?
                        <Col style={{width:"110px"}}>Appatment/Studio</Col>:
                        i.type=='2'?
                        <Col style={{width:"110px"}}>Industrial Buildings</Col>:
                        i.type=='3'?
                        <Col style={{width:"110px"}}>Houses</Col>:
                        i.type=='4'?
                        <Col style={{width:"110px"}}>Villas</Col>:
                        i.type=='5'?
                        <Col style={{width:"110px"}}>Buildings</Col>:
                        i.type=='6'?
                        <Col style={{width:"110px"}}>Bungalows</Col>:
                        i.type=='7'?
                        <Col style={{width:"110px"}}>Offices</Col>:
                        i.type=='8'?
                        <Col style={{width:"110px"}}>Shops</Col>:
                        <Col style={{width:"110px"}}>-</Col>
    }
                          {i.area!=null ?
                        <Col style={{width:"110px"}} >{i.area}+</Col>
                        :<Col style={{width:"110px"}} >-</Col>}
                         {i.longitude!=null ?
                        <Col style={{width:"110px"}}>{i.longitude},{i.latitude}</Col>
                        :<Col style={{width:"110px"}} >-</Col>}
                        <Col style={{color:"#32b69b"}}> <MDBIcon icon="trash" onClick={()=>this.del(i.id)}/></Col>
                      </Row>
                    )}
                </Row>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="card-user">
                <CardHeader style={{ backgroundColor: "white" }}>
                  <CardTitle tag="h5">Account Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="px-1" md="5">
                        <FormGroup>
                          <label>First name</label>
                          <Input
                            defaultValue={this.state.first_name}
                            name="first_name"
                            onChange={this.handlechangeall}
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="5">
                        <FormGroup>
                          <label>Last name</label>
                          <Input
                            defaultValue={this.state.last_name}
                            name="last_name"
                            onChange={this.handlechangeall}
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <Input
                            placeholder="Email"
                            defaultValue={this.state.email}
                            name="email"
                            onChange={this.handlechangeall}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Phone</label>
                          <Input
                            defaultValue={this.state.phone}
                            name="phone"
                            onChange={this.handlechangeall}
                            placeholder="Phone"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">Balance</label>
                          <Input
                            placeholder="Balance"
                            defaultValue={this.state.balance}
                            name="Balance"
                            onChange={this.handlechangeall}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Date of Birth
                          </label>
                          <Input
                            placeholder="Date of birth"
                            defaultValue={this.state.date_of_birth}
                            name="date_of_birth"
                            onChange={this.handlechangeall}
                            type="date"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-1">
                        <label>Address</label>
                        <ListCountries
                          country={this.onChangeCountry}
                          state={this.onChangeRegion}
                        />
                        <br />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-1" md="5">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Old Password
                          </label>
                          <Input
                            placeholder="*********"
                            defaultValue={this.state.password}
                            name="password"
                            onChange={this.handlechangeall}
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="5">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            New Password
                          </label>
                          <Input
                            placeholder="Password"
                            defaultValue={this.state.password}
                            name="password"
                            onChange={this.handlechangeall}
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <div className="update ml-auto mr-auto">
                          <button
                            className="btn-round"
                            color="primary"
                            type="submit"
                            onClick={() => this.editProfile}
                          >
                            Update Account
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    } else {
      {
        this.props.history.push("/login");
      }
      return <div></div>;
    }
  }
}
export default UserProfile;
