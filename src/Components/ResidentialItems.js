import React from 'react'
import axios from 'axios';
import Slideshow from './Slideshow';
import Pagination from "react-js-pagination";
import '../style/MyAuctions.css';
import firebase from '../utils/firebase';
import Navbar from '../Components/Navbar';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import AddBid from './AddBid';
import { DropdownButton ,Dropdown} from 'react-bootstrap';
import Details from './Details';
import {MDBIcon } from "mdbreact";
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
import SearchableMap from './Mymap';
import ViewOnMap from './ViewOnMap';
import Getbids from './Getbids';

class ResidentialAuctions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bids:[],
            activePage:0,
            total:0,
            per_page:0,
            item_id:0,
            coordinates:[],
            lists:[],
            user:"",
            setOpenDet:false,
            item:"",
            fl: true
               }

               this.rendarTimeLaps = this.rendarTimeLaps.bind(this);
    }
 async componentDidMount(){
  await this.getAllItems();
  await this.getBidsHistory();
}
handlePageChange(pageNumber) {
  this.setState({activePage: pageNumber});
}

 async getAllItems(pageNumber){
   this.handlePageChange(pageNumber);
  axios.defaults.withCredentials=true;
  await axios.get(`/api/getResdentialItems?page=${pageNumber}`).then(res=>{
    const coor = res.data.items.data;
    coor.map((item)=>{
     var c = new Object();
     c.longitude=item.longitude
     c.latitude=item.latitude
     c.area=item.area
     console.log(c)
     this.state.coordinates.push(c);
    
    })
    console.log(res)
    this.setState({
      bids:res.data.items.data,
      per_page:res.data.items.per_page,
      total:res.data.items.total,
      activePage:res.data.items.current_page,
     });
  })
  console.log(this.state.user)
}
numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
countDownDate(date){
  return new Date(date).getTime();
} 
handleClickOpenDet = (item) => {
  // console.log('test')
  this.setState({setOpenDet:true,item:item});
};
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
forcerender = ()=>{
  setInterval(() => {
    this.setState({
      fl: !this.state.fl
    })
  }, 3000);
}
addFav(itemid){
  let formData={
    "auction_id":itemid
  }
  axios.defaults.withCredentials=true;
  axios.post(`/api/addFav`,formData).then(res=>{
      // console.log(res);
  })
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
closeDialogDet = () => {
  this.setState({setOpenDet: false});
};
renderItems(){
  const data =this.state.bids;
  let max =0;
const maxbids = this.state.lists;
  return (
    <React.Fragment>
       { this.state.setOpenDet ? 
            <Details openDet={true} closeDialogDet={this.closeDialogDet} item={this.state.item}/>
              : <></>
          }
      <div className="itemss">
        {data.map((item,index)=>
        <Card key={index} className="xsmall">
          <div style={{backgroundColor:"rgba(0,0,0,.03)",width:"100%"}}>
          <button type="submit" className="fav" onClick={()=>this.addFav(item.id)}><MDBIcon icon="far fa-bookmark fa-2x" /></button>
         </div>
          <CardHeader>
              <Row>
                <div  className="countdown">
                  <h3>
                  { this.rendarTimeLaps(item)}
                  </h3>
                  
                </div>
                </Row>
                <Slideshow images={item.auction_images}/>
                <Row>
                <Col>
                {item.bedrooms > 0 ? 
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
                } 
                 </Col>
              </Row>
              <button type="submit" onClick={()=>this.handleClickOpenDet(item)} className="ree">View details </button>
                </CardHeader>
                <CardBody>
                  <Row>
                  <Col>
                  <i>Starting Bid</i><br/>
                  <h5 style={{marginLeft:"5px"}}> ${this.numberWithCommas(item.starting_price)}+</h5>
                  </Col>
                  <Col>
                  <i>Current Bid</i><br/>
                    {maxbids.map((i,ind) => {
                      if(i.item_id ==item.id)
                       if(i.price > max) max=i.price;
                    })}
                    <h5 style={{marginLeft:"5px"}} id={index.ind}> $ {this.numberWithCommas(max)}</h5>
                <b style={{color:"white"}}>{max=0}</b> 
                  </Col>
                  </Row>
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
          itemClass="page-item"
          linkClass="page-link"
          onChange={(pageNumber)=>{this.getAllItems(pageNumber)}}
        />
      </div>
   </React.Fragment>
   )

}
handleClickL(){
  var x = document.getElementById("ddropdowntyypee");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
    render(){
     const bids = this.state;
         if(this.state.bids.length < 0){
           return <div><br/></div>
         }
         const optionsArray = [
          { key: "el", label: "electricity" },
          { key: "elv", label: "elevator" },
          { key: "hc", label: "heating/cooling" },
          { key: "p", label: "parking" },
        ];
        const optArray = [
          { key: "Appartments/Studios", label: "Appartments/Studios" },
          { key: "Industrial Buildings", label: "Industrial Buildings" },
          { key: "Houses", label: "Houses" },
          { key: "Villas", label: "Villas" },
          { key: "Buildings", label: "Buildings" },
          { key: "Bungalows", label: "Bungalows" },
          { key: "Offices", label: "Offices" },
          { key: "Shops", label: "Shops" },
        ];
        return(
            <div>
                <Navbar />
                <div className="filters"> 
                <DropdownButton  title="category" id="dropdowntyype" onSelect={this.handleSelectcat}> 
                    <Dropdown.Item ><button className="removv" onClick={this.handleClickH}>House</button></Dropdown.Item>
                    <Dropdown.Item ><button className="removv" onClick={this.handleClickL}>Land</button></Dropdown.Item> 
                    <Dropdown.Item ><button className="removv" onClick={this.handleClickL}>any</button></Dropdown.Item> 
                    </DropdownButton>

                    <DropdownButton  title="Area" id="dropdowntyype" onSelect={this.handleSelectarea}>
                   <Dropdown.Item >Any</Dropdown.Item>
                    <Dropdown.Item >1000 - 5500  sqft</Dropdown.Item>
                    <Dropdown.Item >5500 - 10800 sqft</Dropdown.Item> 
                    <Dropdown.Item >10800 - 16200  sqft</Dropdown.Item>
                    <Dropdown.Item >16200 +  sqft</Dropdown.Item>
                    </DropdownButton>
                    
                   
                   <div id="ddropdowntyypee">
                   <DropdownMultiselect id="bd"  placeholder="Services"  options={optionsArray} name="Services" />
                    <h6 style={{color:"white"}}>a</h6>
                   <DropdownButton  title="Baths" id="bd" onSelect={this.handleSelectbaths}> 
                   <Dropdown.Item >Any</Dropdown.Item>
                    <Dropdown.Item >1+</Dropdown.Item>
                    <Dropdown.Item >2+</Dropdown.Item> 
                    <Dropdown.Item >3+</Dropdown.Item>
                    <Dropdown.Item >4+</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton  title="Beds" id="bd"  onSelect={this.handleSelectbeds}> 
                    <Dropdown.Item >Any</Dropdown.Item>
                    <Dropdown.Item >1+</Dropdown.Item>
                    <Dropdown.Item >2+</Dropdown.Item> 
                    <Dropdown.Item >3+</Dropdown.Item>
                    <Dropdown.Item >4+</Dropdown.Item> 
                    <Dropdown.Item >5+</Dropdown.Item> 
                    </DropdownButton>
                    <DropdownMultiselect id="dropdowntyype"  placeholder="House Type" options={optArray} name="Home Type" />
                   
                    
                  </div>
              
                    <Button type="submit" name="search"  id="s" onClick={this.filter}>Search</Button>
                    </div>
                <div className="split left">
                  {/* <SearchableMap/> */}
                  <ViewOnMap coordinates={this.state.coordinates}/>
                </div>
                
              <div className="split right">
              {bids && this.renderItems()}
              </div>
            </div>
        )
    }
}
export default ResidentialAuctions;