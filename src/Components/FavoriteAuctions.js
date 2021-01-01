import React from 'react'
import axios from 'axios';
import Slideshow from './Slideshow';
import Pagination from "react-js-pagination";
import '../style/MyAuctions.css';
import AddBid from './AddBid';
import { DropdownButton ,Dropdown} from 'react-bootstrap';
import UserSidebar from './UserSidebar';
import CreateHomeAuction from './CreateHomeAuction';
import {MDBIcon } from "mdbreact";
import CreateLandAuction from './CreateLandAuction';
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

class FavAuctions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            favbids:[],
            setOpen:false,
            setOpenL:false,
            activePage:0,
            total:0,
            per_page:0,
            fl: true
               }
 this.rendarTimeLaps = this.rendarTimeLaps.bind(this);
    }
    addImage=(file)=>
    {
      this.setState({ 
        image: file[0],
      })
    }
    handleClickOpen = () => {
    this.setState({setOpen:true});
  };
   closeDialog = () => {
    this.setState({setOpen: false});
  };
  handleClickOpenL = () => {
    this.setState({setOpenL:true});
  };
   closeDialogL = () => {
    this.setState({setOpenL: false});
  };
  logout = e => {
    e.preventDefault();
    axios.get("/sanctum/csrf-cookie").then(response => {
      axios.post("/logout").then(res => {
        sessionStorage.removeItem('loggedIn');
        this.props.history.push('/login');
      });
    });
};
 async componentDidMount(){
  await this.getUserFavItems();
}
handlePageChange(pageNumber) {
  this.setState({activePage: pageNumber});
}
 async getUserFavItems(pageNumber=1){
   console.log(pageNumber)
   this.handlePageChange(pageNumber);
  axios.defaults.withCredentials=true;
  await axios.get(`/api/getFav?page=${pageNumber}`).then(res=>{
      console.log(res.data.items.data);
    this.setState({
      favbids:res.data.items.data,
      per_page:res.data.items.per_page,
      total:res.data.items.total,
      activePage:res.data.items.current_page
     });
  })
}
countDownDate(date){
  return new Date(date).getTime();
} 

forcerender = ()=>{
  setInterval(() => {
    this.setState({
      fl: !this.state.fl
    })
  }, 3000);
}
numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
rendarTimeLaps(item){
    var now = new Date().getTime();
    var countDownDate = new Date(item.planned_close_date).getTime();
    var timeleft = countDownDate - now;
    if(timeleft < 0){
      return "Auction Ended"
    }
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    this.forcerender();
      return days + "d "+hours + "h " +minutes + "m "+seconds + "s"
}
remFav=(id)=>{
    let formData={
        auction_id:id
    }
    axios.defaults.withCredentials=true;
  axios.post(`/api/remFav`,formData).then(res=>{
      console.log(res);
  })
}
renderUserItems(){
  const data =this.state.favbids;
  const active=this.state.activePage;
  return (
    <React.Fragment>
      <div className="itemsf">
        {data.map((item,index)=>
        <Card key={index} className="xsmall">
          <CardHeader>
            <Row>
                <div  className="countdown">
                  <h3>
                  { this.rendarTimeLaps(item)}
                  </h3>
                </div>
                </Row>
                <Row></Row>
                <Slideshow images={item.auction_images}/>
                </CardHeader>
                <CardBody>
                <Row><h3 style={{marginLeft:"5px"}}> ${this.numberWithCommas(item.starting_price)}+</h3>
              <Col><strong>{item.bedrooms}</strong>Beds | <strong>{item.bathrooms}</strong>  Baths |
              <strong> {item.diningrooms}</strong>  Dinings |
              <strong>  {item.parking}</strong>  Parkings </Col>
              </Row>
             <br/>
              <Row>
                <Col>
                {/* <p>{item.description}</p> */}
                </Col>
              </Row>
              <button type="submit" onClick={()=>this.remFav(item.id)} style={{backgroundColor:"white",border:0,color:"#32b69b"}}><MDBIcon fas icon="trash" /> Remove </button>
                <a href="/details" className="viewd">View details</a>
              </CardBody>
              <AddBid item_id={item.id}/>
          </Card>
        )
      }
      </div>
      <div className="pag">
      <Pagination
          activePage={this.state.current_page}
          itemsCountPerPage={this.state.per_page}
          totalItemsCount={this.state.total}
          pageRangeDisplayed={5}
          onChange={(pageNumber)=>{this.getUserItems(pageNumber)}}
          itemClass="page-item"
          linkClass="page-link"
          
        />
      </div>
   </React.Fragment>
   )

}
    render(){
     const bids = this.state;
          if(this.state.setOpen) {
      return <CreateHomeAuction openD={this.state.setOpen} closeD={this.closeDialog}/>
         }
         if(this.state.setOpenL){
           return <CreateLandAuction openL={this.state.setOpenL} closeL={this.closeDialogL}/>
         }
         if(this.state.favbids.length < 0){
           return <div><br/></div>
         }
        return(
            <div className="fixeside">
                <UserSidebar className="side"/>
                <div id="myaucnav">
                <DropdownButton  title="Create Auction" id="dropdown" style={{marginLeft:"950px"}}> 
                    <Dropdown.Item href=""><a href="/home" className="drop" onClick={this.handleClickOpen}>Buildings</a></Dropdown.Item>
                    <Dropdown.Item href=""><a href="/land" className="drop" onClick={this.handleClickOpenL}>Lands</a></Dropdown.Item>
                    </DropdownButton>   
                      <button id="btn-logout" onClick={this.logout}>Logout</button>
            </div>
              {bids && this.renderUserItems()}
             
            </div>
        )
    }
}
export default FavAuctions;