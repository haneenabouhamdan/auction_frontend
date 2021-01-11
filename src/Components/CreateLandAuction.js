import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import firebase from "../utils/firebase";
import "../style/MyAuctions.css";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Label,
  Row,
  FormGroup,
} from "reactstrap";
import "../App.css";
import SearchableMap from "./Mymap";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";

import UserSidebar from "./UserSidebar";
import { DropdownButton, Dropdown } from "react-bootstrap";
import ImageUploading from "react-images-uploading";
const maxNumber = 20;
class CreateLandAuction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: "",
      latitude: "",
      area: "",
      bedrooms: 0,
      bathrooms: 0,
      diningrooms: 0,
      Balcony: 0,
      type: "",
      parking: 0,
      elevator: false,
      electricity: false,
      heating_cooling: false,
      start_date: "",
      planned_close_date: "",
      starting_price: "",
      category: 1,
      final_price: 0,
      auction_categories_id: "",
      date: new Date(),
      owner: 0,
      item_id: 0,
      image: "",
      images: [],
      emails: [],
      feedback: "",
      emails: [],
      send_to: "",
      to_name: "",
      name: "D.P.M",
      email: "DPM@gmail.com",
      setOpenL: false,
    };
  }
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
  onChange = (imageList) => {
    // data for submit
    //Getting total number of images
    var images = imageList.length;
    // Create an object of formData
    const formData = new FormData();

    //Saving multiple images in formadta varibale
    for (var a = 0; a < images; a++) {
      formData.append("myFile" + a, imageList[a].file, imageList[a].file.name);
    }
    this.setState({ images: imageList });
    console.log(imageList);
    //  axios.post("http://localhost/reactimageupload.php", formData);
  };

  fileSelectedHandler = (e) => {
    this.setState({ images: [...this.state.images, ...e.target.files] });
  };
  handlechangeall = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClose = () => {
    this.setState({
      setOpenL: false,
    });
    this.props.closeL();
  };
  onChangelong = (e) => {
    this.setState({ longitude: e });
  };
  onChangelat = (e) => {
    this.setState({ latitude: e });
  };
  sendNot = () => {
    const notsref = firebase.database().ref("Notifications");

    const not = {
      date: this.state.date,
      message: this.state.message,
      closeDate: this.state.planned_close_date,
      item_id: this.state.item_id,
      owner: this.state.first + " " + this.state.last,
      owner_id: this.state.owner,
      image: this.state.image,
    };
    notsref.push(not);
  };
  getEmails() {
    axios.defaults.withCredentials = true;
    axios.get("/api/getAllEmails", this.state.owner).then((res) => {
      this.setState({
        emails: res.data.emails,
      });
    });
  }
  componentDidMount() {
    axios.defaults.withCredentials = true;
    axios.get("/api/user").then((response) => {
      this.setState({
        image: response.data.image,
        first: response.data.first_name,
        last: response.data.last_name,
        owner: response.data.id,
      });
    });
    this.getEmails();
  }
  handleSelect = (e) => {
    console.log(e);
    switch (e) {
      case "1":
        this.setState({ type: "Residential", auction_categories_id: "1" });
        break;
      case "2":
        this.setState({ type: "Commercial", auction_categories_id: "2" });
        break;
      case "3":
        this.setState({ type: "Industrial", auction_categories_id: "3" });
        break;
      case "4":
        this.setState({ type: "Agricultural", auction_categories_id: "4" });
        break;
      case "5":
        this.setState({ type: "Others", auction_categories_id: "4" });
        break;
    }
  };
  onSubmit = () => {
    const emails = this.state.emails;
    let formData = {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      area: this.state.area,
      description: this.state.description,
      bedrooms: this.state.bedrooms,
      bathrooms: this.state.bathrooms,
      diningrooms: this.state.diningrooms,
      Balcony: this.state.Balcony,
      parking: this.state.parking,
      type: this.state.type,
      elevator: this.state.elevator,
      electricity: this.state.electricity,
      heating_cooling: this.state.heating_cooling,
      start_date: this.state.start_date,
      planned_close_date: this.state.planned_close_date,
      starting_price: this.state.starting_price,
      auction_categories_id: this.state.auction_categories_id,
      final_price: this.state.final_price,
      caregory: this.state.category,
      images: this.state.images,
    };
    axios.defaults.withCredentials = true;
    axios
      .post("/api/addAuction", formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        console.log(response);

        this.setState({
          item_id: response.data.item,
          owner: response.data.owner,
        });
      });
    // this.sendNot();
   
    const templateId = "template_rn864da";
    emails.map((i) => {
      console.log(i);
      this.sendFeedback(templateId, {
        send_to: i.email,
        message_html: this.state.feedback,
        from_name: this.state.name,
        reply_to: this.state.email,
      });
    });
    this.setState({
      longitude: "",
      latitude: "",
      area: "",
      bedrooms: 0,
      bathrooms: 0,
      diningrooms: 0,
      Balcony: 0,
      type: "",
      parking: 0,
      description:"",
      elevator: false,
      electricity: false,
      heating_cooling: false,
      start_date: "",
      planned_close_date: "",
      starting_price: "",
      category: 1,
      final_price: 0,
      auction_categories_id: "",
      images: [],
    })
  };

  render() {
    return (
      <div class="h-100">
        <MDBRow class="h-100">
          <MDBCol md="2">
            <UserSidebar />
          </MDBCol>
          <MDBCol md="10">
            <Card style={{ width: "100%" }}>
              <CardHeader
                style={{
                  backgroundColor: "white",
                  height: "55px",
                  color: "#32b69b",
                }}
              >
                <h2> Please Add Auction Details</h2>
              </CardHeader>

              <CardBody>
                <FormGroup>
                  {/* <a href="/userauctions" style={{color:"white"}}>
                    <MDBIcon icon="arrow-left"></MDBIcon> Back
                  </a> */}

                  <Label style={{ color: "grey", marginLeft: "10px" }}>
                    <h6 style={{ fontWeight: 300 }}>Start Date</h6>
                  </Label>
                  <Label
                    style={{
                      color: "grey",
                      marginLeft: "200px",
                      marginTop: "10px",
                    }}
                  >
                    <h6 style={{ fontWeight: 300 }}>Close Date</h6>
                  </Label>
                  <Row>
                    <Input
                      type="datetime-local"
                      name="start_date"
                      onChange={this.handlechangeall}
                      className="start_date"
                      value={this.state.start_date}
                      placeholder="Start Date"
                    />
                    <Input
                      type="datetime-local"
                      name="planned_close_date"
                      value={this.state.planned_close_date}
                      onChange={this.handlechangeall}
                      className="closee"
                      placeholder="Close Date"
                    />
                  </Row>
                  <Row>
                    <Input
                      type="number"
                      name="area"
                      className="area"
                      value={this.state.area}
                      onChange={this.handlechangeall}
                      placeholder="Area in sqft"
                    />
                    <Input
                      type="number"
                      className="startprice"
                      onChange={this.handlechangeall}
                      value={this.state.starting_price}
                      name="starting_price"
                      placeholder="Starting Price"
                    />
                  </Row>
                </FormGroup>
                <Input
                  type="text"
                  name="description"
                  onChange={this.handlechangeall}
                  value={this.state.description}
                  className="descriptionl"
                  placeholder="Description"
                />
                <DropdownButton
                  title="Land Type"
                  id="type"
                  onSelect={this.handleSelect}
                >
                  <Dropdown.Item eventKey="1">Residential</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Commercial</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Industrial</Dropdown.Item>
                  <Dropdown.Item eventKey="4">Agricultural</Dropdown.Item>
                  <Dropdown.Item eventKey="5">Others</Dropdown.Item>
                </DropdownButton>
              

                <div className="img images">
                  <ImageUploading
                    onChange={this.onChange}
                    maxNumber={maxNumber}
                    acceptType={["jpg", "png", "jpeg", "webp"]}
                    id="img"
                    multiple
                  >
                    {({ imageList, onImageUpload }) => (
                      // write your building UI
                      <div className="imageuploader">
                        <div className="mainBtns">
                          <button
                            className="btn btn-primary mr-1"
                            onClick={onImageUpload}
                          >
                            Upload Images
                          </button>
                        </div>
                        {imageList.map((image) => (
                          <div className="imagecontainer" key={image.key}>
                            <img src={image.dataURL} />
                          </div>
                        ))}
                      </div>
                    )}
                  </ImageUploading>
                </div>
                <label className="loc">Choose location</label>
                <div className="map">
                  <SearchableMap
                    longitude={this.onChangelong}
                    latitude={this.onChangelat}
                  />
                </div>
              </CardBody>

              <Button onClick={this.onSubmit} class="add">
                Submit
              </Button>
            </Card>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}
export default CreateLandAuction;
