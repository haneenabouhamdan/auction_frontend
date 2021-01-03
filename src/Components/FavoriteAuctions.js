import React from 'react'
import axios from 'axios';
import Slideshow from './Slideshow';
import Pagination from "react-js-pagination";
import Details from './Details';
import '../style/MyAuctions.css';
import firebase from '../utils/firebase';
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
            lists:[],
            setOpenDet:false,
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
  closeDialogDet = () => {
    this.setState({setOpenDet: false});
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
  await this.getBidsHistory();
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
getBidsHistory=()=>{
  const bidsref = firebase.database().ref("Bids");
  bidsref.on('value',(snapshot)=>{
      const lists = snapshot.val();
      const list=[];
      for(let id in lists){
          list.push(lists[id]);   
      }
      // console.log(list)
      this.setState({lists:list});
  })
}
handleClickOpenDet = (item) => {
  console.log('test')
  this.setState({setOpenDet:true,item:item});
};
remFav=(id)=>{
    let formData={
        auction_id:id
    }
    axios.defaults.withCredentials=true;
  axios.post(`/api/remFav`,formData).then(res=>{
      console.log(res);
  })
  this.props.history.push('/favItems')
}
renderUserItems(){
  const data =this.state.favbids;
  const active=this.state.activePage;
  let max =0;
  const maxbids = this.state.lists;
  return (
    <React.Fragment>
       { this.state.setOpenDet ? 
            <Details openDet={true} closeDialogDet={this.closeDialogDet} item={this.state.item}/>
              : <></>
          }
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
                <Row>
                <Col><strong>{item.bedrooms}</strong>Beds | <strong>{item.bathrooms}</strong>  Baths |
              <strong> {item.diningrooms}</strong>  Dinings |
              <strong>  {item.parking}</strong>  Parkings </Col></Row>
                </CardHeader>
                <CardBody>
                <Row> <Col>
                  <i>Starting Bid</i><br/>
                  <h5 style={{marginLeft:"5px"}}> ${this.numberWithCommas(item.starting_price)}+</h5>
                  </Col>
                <Col><i>Current Bid</i><br/>
                    {maxbids.map((i,ind) => {
                      if(i.item_id ==item.id)
                       if(i.price > max) max=i.price;
                    })}
                    <h5 style={{marginLeft:"5px"}} key={index.ind}> $ {this.numberWithCommas(max)}</h5></Col>
             <b style={{color:"white"}}>{max=0}</b> 
              </Row>
              <Row>
                <Col>
                {/* <p>{item.description}</p> */}
                </Col>
              </Row>
              <button type="submit" onClick={()=>this.remFav(item.id)} className="rm"><MDBIcon fas icon="trash" /> Remove </button>
              <button type="submit" onClick={()=>this.handleClickOpenDet(item)} className="vd">View details </button>
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