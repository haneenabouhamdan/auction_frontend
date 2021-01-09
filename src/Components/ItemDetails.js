import React from 'react'
import axios from 'axios';
import '../App.css';
import Slideshow from './Slideshow';
import firebase from '../utils/firebase';
import AddBid from './AddBid';
import ViewOnMap from './ViewOnMap';
import Gallery from './gallery';
import Navbar from './Navbar';

class ItemDetails extends React.Component{
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
            //    console.log(this.props.match.params.id);

            //    this.rendarTimeLaps = this.rendarTimeLaps.bind(this);
    }
async componentDidMount(){
    
  this.getBidsHistory();
// await  this.getUser()
await this.getItemDetails();

}

// getUser(){
//   axios.defaults.withCredentials=true;
//   axios.get('/api/getUser/'+this.props.item.users_id).then(res=>{
//     console.log(res)
//     this.setState({
//       "first_name":res.data.user.first_name,
//       "last_name":res.data.user.last_name,
//       "id":res.data.user.id,
//       "email":res.data.user.email,
//       "phone":res.data.user.phone,
//       "image":res.data.user.image,
//       "date_of_birth":res.data.user.date_of_birth,
//       "country":res.data.user.country,
//       "state":res.data.user.state
//     })
// })
// }
  getItemDetails(){
  const data = this.props.match.params.id;
  // console.log(data.users_id)
 axios.defaults.withCredentials=true;
 axios.get('/api/getDetails/'.concat(data)).then((res)=>{
console.log(res.data.item[0]);
    this.setState({
            "longitude":res.data.item[0].longitude,
            "latitude":res.data.item[0].latitude,
            "area":res.data.item[0].area,
            "description":res.data.item[0].description,
            "bedrooms":res.data.item[0].bedrooms,
            "bathrooms":res.data.item[0].bathrooms,
            "diningrooms":res.data.item[0].diningrooms,
            "Balcony":res.data.item[0].Balcony,
            "type":res.data.item[0].type,
            "id":res.data.item[0].id,
            "parking":res.data.item[0].parking,
            "elevator":res.data.item[0].elevator,
            "electricity":res.data.item[0].electricity,
            "heating_cooling":res.data.item[0].heating_cooling,
            "start_date":res.data.item[0].start_date,
            "planned_close_date":res.data.item[0].planned_close_date,
            "starting_price":res.data.item[0].starting_price,
            "preferred_price":res.data.item[0].preferred_price,
            "final_price":res.data.item[0].final_price,
            "auction_categories_id":res.data.item[0].auction_categories_id,
            "images":res.data.item[0].auction_images,
            "users_id":res.data.item[0].users_id
     });
})}
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
        <div>
            <Navbar/>
             <div className="details">
             <Gallery images={data}/>
             </div>
        </div>
        )
    }
}
export default ItemDetails;