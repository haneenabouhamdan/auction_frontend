import React from 'react'
import axios from 'axios';
import Slideshow from './Slideshow';
import Pagination from "react-js-pagination";
import '../style/MyAuctions.css';
import { Multiselect } from "multiselect-react-dropdown";
import { DropdownButton ,Dropdown} from 'react-bootstrap';
import firebase from '../utils/firebase';
import Navbar from '../Components/Navbar';
import AddBid from './AddBid';
import Details from './Details';
import {MDBIcon } from "mdbreact";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import ViewOnMap from './ViewOnMap';

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
            category:0,
            area_min:0,
            area_max:0,
            Services:"",
            fl: true,
            services:[],
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
    //  console.log(c)
     this.state.coordinates.push(c);
    
    })
    // console.log(res)
    this.setState({
      bids:res.data.items.data,
      per_page:res.data.items.per_page,
      total:res.data.items.total,
      activePage:res.data.items.current_page,
     });
  })
  // console.log(this.state.user)
}
style = {
  chips: {
    background: "#32b69b"
  },
  searchBox: {
    "border-bottom": "1px solid lightgrey",
    "border-radius": "2px",
    "height":"50px",
    "font-weight":"200"
  },
  multiselectContainer: {
    color: "grey",
  },
};
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
    handleOnchange  =  val  => {
      this.setState({Services:val})
    }
    handleSelectcat=(e)=>{
    switch(e){
    case '1':
      this.setState({category:0})
      break;
    case '2':
        this.setState({category:1})
      break;
      case '3':
        this.setState({category:3})
      break;
    }
    }
    handleSelectbaths=(e)=>{
      // console.log(e)
    switch(e){
    case '1':
      this.setState({baths:-1})
      break;
    case '2':
        this.setState({baths:1})
      break;
      case '3':
        this.setState({baths:2})
      break;
      case '4':
        this.setState({baths:3})
        break;
      case '5':
          this.setState({baths:4})
        break;      
    }
    }
    handleSelectbeds=(e)=>{
      // console.log(e)
    switch(e){
    case '1':
      this.setState({beds:-1})
      break;
    case '2':
        this.setState({beds:1})
      break;
      case '3':
        this.setState({beds:2})
      break;
      case '4':
        this.setState({beds:3})
        break;
      case '5':
          this.setState({beds:4})
        break;  
        case '6':
          this.setState({beds:5})
        break;      
    }
    }
    handleSelectarea=(e)=>{
      // console.log(e)
    switch(e){
    case '1':
      this.setState({ area_min:-1,
        area_max:-1})
      break;
    case '2':
        this.setState({
          area_min:1000,
          area_max:5500})
      break;
      case '3':
        this.setState({
          area_min:5500,
          area_max:10800})
      break;
      case '4':
        this.setState({
          area_min:10800,
          area_max:5500})
      break;
      case '5':
        this.setState({
          area_min:16200,
          area_max:80000})
      break;
    }
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
        return(
            <div>
                <Navbar />
                <div className="filters"> 
                <DropdownButton  title="category" id="dropdowntyype" onSelect={()=>this.handleSelectcat}> 
                    <Dropdown.Item eventKey="1"><button className="removv" onClick={this.handleClickH}>House</button></Dropdown.Item>
                    <Dropdown.Item eventKey="2"><button className="removv" onClick={this.handleClickL}>Land</button></Dropdown.Item> 
                    <Dropdown.Item eventKey="3"><button className="removv" onClick={this.handleClickA}>any</button></Dropdown.Item> 
                    </DropdownButton>

                    <DropdownButton  title="Area" id="dropdowntyype" onSelect={this.handleSelectarea}>
                   <Dropdown.Item eventKey="1">Any</Dropdown.Item>
                    <Dropdown.Item eventKey="2">1000 - 5500  sqft</Dropdown.Item>
                    <Dropdown.Item eventKey="3">5500 - 10800 sqft</Dropdown.Item> 
                    <Dropdown.Item eventKey="4">10800 - 16200  sqft</Dropdown.Item>
                    <Dropdown.Item eventKey="5">16200 +  sqft</Dropdown.Item>
                    </DropdownButton>
                   <div id="ddropdowntyypee">
                    <h6 style={{color:"white"}}>a</h6>
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
                   
                    <div style={{width:"200px",height:"50px", boxShadow: "0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1)",marginTop:"7px",marginLeft:"10px",marginRight:"10px"}}>
                    <Multiselect
                      options={objectArray}
                      displayValue="key"
                      style={this.style}
                      showCheckbox={true}
                      placeholder="Type"
                    />
                    </div>

                    <div style={{width:"200px",height:"50px", boxShadow: "0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1)",marginTop:"7px",marginLeft:"5px",marginRight:"10px"}}>
                    <Multiselect
                      options={objtArray}
                      displayValue="key"
                      style={this.style}
                      showCheckbox={true}
                      placeholder="Services"
                    />
                    </div>
                    </div>
                    <Button type="submit" name="search"  id="s" onClick={this.filter}>Search</Button>
                    </div>
                    <div className="split left">
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