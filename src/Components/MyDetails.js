import React from 'react'
import axios from 'axios';
import '../style/MyAuctions.css';
import Slideshow from './Slideshow';
import firebase from '../utils/firebase';
import ViewOnMap from './ViewOnMap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";

class MyDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            longitude:"",
            latitude:"",
            area:"",
            description:"",
            bedrooms:"",
            bathrooms:"",
            diningrooms:"",
            Balcony:"",
            type:"",
            parking:"",
            elevator:false,
            electricity:false,
            heating_cooling:false,
            start_date:"",
            planned_close_date:"",
            starting_price:"",
            preferred_price:0,
            final_price:0,
            auction_categories_id:"",
            images:[],
            lists:[],
            first_name:"",
            image:"",
            last_name:"",
            phone:"",
            date_of_birth:"",
            email:"",
            country:"",
            state:"",
            users_id:0,
            id:0,
            item:this.props.item,
            setOpenDet:this.props.openDet,
            coordinates:[],
            fl: true
               }

            //    this.rendarTimeLaps = this.rendarTimeLaps.bind(this);
    }
async componentDidMount(){
  this.getBidsHistory();
await  this.getUser()
await this.getItemDetails();

}

getUser(){
  axios.defaults.withCredentials=true;
  axios.get('/api/getUser/'+this.props.item.users_id).then(res=>{
    console.log(res)
    this.setState({
      "first_name":res.data.user.first_name,
      "last_name":res.data.user.last_name,
      "id":res.data.user.id,
      "email":res.data.user.email,
      "phone":res.data.user.phone,
      "image":res.data.user.image,
      "date_of_birth":res.data.user.date_of_birth,
      "country":res.data.user.country,
      "state":res.data.user.state
    })
})
}
  getItemDetails(){
  const data = this.props.item;
  // console.log(data.users_id)
 
    this.setState({
            "longitude":data.longitude,
            "latitude":data.latitude,
            "area":data.area,
            "description":data.description,
            "bedrooms":data.bedrooms,
            "bathrooms":data.bathrooms,
            "diningrooms":data.diningrooms,
            "Balcony":data.Balcony,
            "type":data.type,
            "id":data.id,
            "parking":data.parking,
            "elevator":data.elevator,
            "electricity":data.electricity,
            "heating_cooling":data.heating_cooling,
            "start_date":data.start_date,
            "planned_close_date":data.planned_close_date,
            "starting_price":data.starting_price,
            "preferred_price":data.preferred_price,
            "final_price":data.final_price,
            "auction_categories_id":data.auction_categories_id,
            "images":data.auction_images,
            "users_id":data.users_id
     });

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
async closeAuc(id, win) {
  const lists = this.state.lists;
  this.setState({ closed: true });
  let today = new Date();
  let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  let month = today.getMonth() + 1;
  let todayDB =
    today.getFullYear() +
    "-" +
    month +
    "-" +
    day +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();
  let formData = {
    auction_id: id,
    closeDate: todayDB,
  };
  // console.log(this.state.winner_name);
  await this.getUserByFullName(win.username);
  axios.defaults.withCredentials = true;
  await axios.post(`/api/closeAuc`, formData).then((res) => {
    // window.location.reload();
  });
  const templateId = "template_u5lgbco";

  this.sendFeedback(templateId, {
    send_to: this.state.winner_email,
    owner_email: this.state.owner_email,
    owner_tel: this.state.owner_tel,
    owner_name: this.state.owner_name,
    to_name: this.state.winner_name,
    message_html: this.state.feedback,
    from_name: this.state.name,
    reply_to: this.state.email,
    owner_loc: this.state.location,
  });
}
rendarTimeLaps(){
  let va =this.props.item
    var now = new Date().getTime();
    var countDownDate = new Date(this.state.planned_close_date).getTime();
    var timeleft = countDownDate - now;
    if(timeleft < 0){
      this.closeAuc()
      return "Auction Ended"
    }
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    this.forcerender();
      return days + "d "+hours + "h " +minutes + "m "+seconds + "s"
}


handleClose = () => {
  this.setState({
    setOpenDet: false
  })
  this.props.closeDialogDet();
};
getBidsHistory=()=>{
  const bidsref = firebase.database().ref("Bids");
  bidsref.on('value',(snapshot)=>{
      const lists = snapshot.val();
      const list=[];
      for(let id in lists){
          list.push(lists[id]);   
      }
      this.setState({lists:list});
  })
}

  render(){
    const data = this.state.images
    let max =0;
    const maxbids = this.state.lists;
    var c = new Object();
    c.longitude=this.state.longitude
    c.latitude=this.state.latitude
    c.area=this.state.area
    this.state.coordinates.push(c);
    return(
          <Dialog open={this.state.setOpenDet} onClose={this.handleClose} className="diag">
          <DialogContent style={{width:"100%",height:"100%"}}>
              <div>
               <Slideshow images={data}/>
               <div>
               <Card className="medium">
          <CardHeader>
            <Row>
                <div  className="countdown">
                  <h3>
                  { this.rendarTimeLaps()}
                  </h3>
                </div>
                </Row>
                <Row></Row>
  
                </CardHeader>
                <CardBody>
                <Row>
                  <Col>
                  <i style={{color:"#32b69b"}}>Starting Bid</i>
  
                  <h5 style={{marginLeft:"5px",marginTop:"5px"}}> ${this.numberWithCommas(this.state.starting_price)}+</h5>
                  </Col>
                  <Col></Col>
                  <Col>
                  <i style={{color:"#32b69b"}}>Current Bid</i><br/>
                    {maxbids.map((i,ind) => {
                      if(i.item_id ==this.state.id)
                       if(i.price > max) max=i.price;
                    })}
                    <h5 style={{marginLeft:"5px"}}> $ {this.numberWithCommas(max)}+</h5>
                  </Col>
                  </Row>
                  <hr/>
                <Row>
              <Col><strong>{this.state.bedrooms}</strong> Bedrooms | <strong>{this.state.bathrooms}</strong>  Bathrooms |
              <strong> {this.state.diningrooms}</strong>  Diningrooms |
              <strong> {this.state.parking}</strong>  Parking |
               <strong> {this.numberWithCommas(this.state.area)}</strong> sqft </Col>
              </Row>
              <Row></Row><br/>
              <i style={{color:"#32b69b"}}>Services :</i>
              <Row style={{marginLeft:"10px"}}>
              
                <Col>
              Elevator  :  <strong> { this.state.elevator=="0" ? " No" : " Yes" }</strong> </Col><Col>
              Heating and cooling: <strong> { this.state.heating_cooling=="0" ? " No" : " Yes" }</strong></Col><Col>
              Electricity  :  <strong> { this.state.electricity=="0" ? " No" : " Yes" }</strong></Col>
              </Row>
              <hr/>
              <i style={{color:"#32b69b"}}>Description :</i>
              <Row >
                <Col>{this.state.description}</Col>
               </Row>
               <hr/>
               <Row style={{height:"300px"}}>
                 <Col><ViewOnMap coordinates={this.state.coordinates}/></Col></Row>
                 <hr/>
                 <i style={{color:"#32b69b"}}>Bidding History</i> 
                    {maxbids.map((i,ind) => {
                          if(i.item_id==this.state.id)
                          return <Row id={ind}><i style={{color:"white"}}>,,,,,,,</i><i>{i.username}</i> <i style={{color:"white"}}>,,,,,,,</i> {this.numberWithCommas(i.price)} $</Row>
                        })}
              
              </CardBody>
              </Card>
               </div>
              </div>
            </DialogContent>
            <DialogActions style={{float:"inline-end"}}>
          <Button onClick={this.handleClose} id="can">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        )
    }
}
export default MyDetails;