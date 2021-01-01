import React from 'react'
import axios from 'axios';
import '../style/MyAuctions.css';
import Gallery from "react-photo-gallery";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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

class Details extends React.Component{
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
            open:false,
            fl: true
               }

            //    this.rendarTimeLaps = this.rendarTimeLaps.bind(this);
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
  componentDidMount(){
   this.getItemDetails();
}

  getItemDetails(){
  const data = this.props.item;
  console.log(data)
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
            "images":data.auction_images
     });
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

rendarTimeLaps(){
    var now = new Date().getTime();
    var countDownDate = new Date(this.state.planned_close_date).getTime();
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

renderUserItems(){
  return (
    <React.Fragment>
     <div className="split left">
       hellooo
     <Gallery photos={this.state.images} />
     </div>
   </React.Fragment>
   )

}
handleClose = () => {
  this.setState({
    open: false
  })
  this.props.closeDet();
};
  render(){
    return(
          <Dialog open={this.props.openDet} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
          <DialogContent style={{width:550,height:1000}}>
                <Card style={{width:500}}>
              <CardHeader style={{backgroundColor:"#32b69b",color:"white"}}>
                  <h2> Please Add Auction Details</h2>
              </CardHeader>
              <CardBody >
            <div className="fixeside">
              {this.renderUserItems()}
            </div>
            </CardBody>
            </Card>
            </DialogContent>
            <DialogActions style={{float:"inline-end"}}>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
        )
    }
}
export default Details;