import React from 'react'
import axios from 'axios';
import Slideshow from './Slideshow';
import Pagination from "react-js-pagination";
import '../style/MyAuctions.css';
import Navbar from '../Components/Navbar'
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

class ResidentialAuctions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bids:[],
            activePage:0,
            total:0,
            per_page:0,
            fl: true
               }

               this.rendarTimeLaps = this.rendarTimeLaps.bind(this);
    }
 async componentDidMount(){
  await this.getAllItems();
}
handlePageChange(pageNumber) {
  this.setState({activePage: pageNumber});
}
 async getAllItems(pageNumber){
   this.handlePageChange(pageNumber);
  axios.defaults.withCredentials=true;
  await axios.get(`/api/getAllAuctions?page=${pageNumber}`).then(res=>{
    this.setState({
      bids:res.data.items.data,
      per_page:res.data.items.per_page,
      total:res.data.items.total,
      activePage:res.data.items.current_page
     });
  })
}
numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

renderItems(){
  const data =this.state.bids;
  const active=this.state.activePage;
  return (
    <React.Fragment>
      <div className="items">
        {data.map((item,index)=>
        <Card key={index} className="xsmall">
          <CardHeader>
                
                <Slideshow images={item.auction_images}/>
                <Row>
                <div  className="countdown">
                  <h3>
                  { this.rendarTimeLaps(item)}
                  </h3>
                </div>
                </Row>
                </CardHeader>
                <CardBody>
                <Row><h3 style={{marginLeft:"5px"}}> ${this.numberWithCommas(item.starting_price)}+</h3>
              <Col><strong>{item.bedrooms}</strong>Beds | <strong>{item.bathrooms}</strong>  Baths |
              <strong> {item.diningrooms}</strong>  Dinings |
              <strong>  {item.parking}</strong>  Parkings </Col>
              </Row>
             <br/>
              {/* <Row>
                <Col>
                <p>{item.description}</p>
                </Col>
              </Row> */}
              <Row>
                {/* //view bids history */}
              </Row>
              <Input type="number" name="bids"/>
                <Button type="submit" id="subid">Submit A Bid</Button>
                </CardBody>
          </Card>
        )
      }
      </div>
      <div style={{marginLeft:"300px"}}>
      <Pagination
          activePage={this.state.current_page}
          itemsCountPerPage={this.state.per_page}
          totalItemsCount={this.state.total}
          pageRangeDisplayed={5}
          onChange={(pageNumber)=>{this.getUserItems(pageNumber)}}
        />
      </div>
   </React.Fragment>
   )

}
    render(){
     const bids = this.state;
       
         if(this.state.bids.length < 0){
           return <div><br/></div>
         }
        return(
            <div>
                <Navbar />
              {bids && this.renderItems()}
              
            </div>
        )
    }
}
export default ResidentialAuctions;