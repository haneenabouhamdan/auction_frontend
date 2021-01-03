import React from 'react'
import axios from 'axios';
import Slideshow from './Slideshow';
import Pagination from "react-js-pagination";
import '../style/MyAuctions.css';
import {MDBIcon } from "mdbreact";
import firebase from '../utils/firebase';
import { DropdownButton ,Dropdown} from 'react-bootstrap';
import UserSidebar from './UserSidebar';
import CreateHomeAuction from './CreateHomeAuction';
import CreateLandAuction from './CreateLandAuction';
import Details from './Details';
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

class MyAuctions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mybids:[],
            setOpen:false,
            setOpenL:false,
            setOpenDet:false,
            activePage:0,
            total:0,
            per_page:0,
            OpenDet:false,
            fl: true,
            item:[],
            lists:[],
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
  handleClickOpenDet = (item) => {
    console.log('test')
    this.setState({setOpenDet:true,item:item});
  };
   closeDialogDet = () => {
    this.setState({setOpenDet: false});
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
  await this.getUserItems();
  await this.getBidsHistory();
}
handlePageChange(pageNumber) {
  this.setState({activePage: pageNumber});
}
remAuc=(id)=>{
  let formData={
      auction_id:id
  }
  axios.defaults.withCredentials=true;
axios.post(`/api/remAuc`,formData).then(res=>{
    // console.log(res);
    this.getUserItems();

})
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
 async getUserItems(pageNumber){
   console.log(pageNumber)
   this.handlePageChange(pageNumber);
  axios.defaults.withCredentials=true;
  await axios.get(`/api/getUserAuctions?page=${pageNumber}`).then(res=>{
    this.setState({
      mybids:res.data.items.data,
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
numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
renderUserItems(){
  const data =this.state.mybids;
  let max =0;
  const maxbids = this.state.lists;
  return (
    <React.Fragment>
      <div className="items">
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
                <Row>
                  <Col>
                  <i>Starting Bid</i>
                  
                  <h5 style={{marginLeft:"5px",marginTop:"5px"}}> ${this.numberWithCommas(item.starting_price)}+</h5>
                  </Col>
                  <Col>
                  <i>Current Bid</i><br/>
                    {maxbids.map((i,ind) => {
                      if(i.item_id ==item.id)
                       if(i.price > max) max=i.price;
                    })}
                    <h5 style={{marginLeft:"5px"}} key={index.ind}> $ {this.numberWithCommas(max)}+</h5>
                 
             <b style={{color:"white"}}>{max=0}</b> 
                  </Col>
                  </Row>
                <Row>
              <Col>{item.bedrooms > 0 ? 
                <div className="flex"><strong>{item.bedrooms}</strong> Beds <strong>| </strong></div> :
                <></>
                }
                 {item.bathrooms > 0 ? 
                <div className="flex"><strong>{item.bathrooms}</strong> Baths <strong>| </strong></div> :
                <></>
                }
                 {item.diningrooms > 0 ? 
                <div className="flex"><strong>{item.diningrooms}</strong> Dinings <strong>| </strong></div> :
                <></>
                } 
                  {item.parking > 0 ? 
                <div className="flex"><strong>{item.parking}</strong> Parking <strong>| </strong></div> :
                <></>
                } 
                  {item.area > 0 ? 
                <div className="flex"><strong>{this.numberWithCommas(item.area)}</strong> sqft </div> :
                <></>
                } </Col>
              </Row>
             <br/>
              <Row>
              </Row>
              <button type="submit" onClick={()=>this.remAuc(item.id)} className="remove"><MDBIcon fas icon="trash" /> Delete </button>
              <button type="submit" onClick={()=>this.handleClickOpenDet(item)} className="removee">View details </button>
              </CardBody>

          </Card>
        )
      }
      </div>
      <br/>
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
         if(this.state.mybids.length < 0){
           return <div><br/></div>
         }
        //  if(this.state.setOpenDet){
        //   }
        return(
            <div className="fixeside">
            { this.state.setOpenDet ? 
            <Details openDet={true} closeDialogDet={this.closeDialogDet} item={this.state.item}/>
              : <></>
          }
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
export default MyAuctions;