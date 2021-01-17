import React from 'react';
import firebase from '../utils/firebase';
import '../App.css'
import axios from 'axios';
class AddBidD extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bids:[],
            user_id:0,
            first_name:"",
            last_name:"",
            item_id:0,
            error:false,
            date:new Date(),
            price:"",
         }
        }
        handleOnchange=(event)=>{
            this.setState ( { [event.target.name] :event.target.value  } )
        }
        componentDidMount() {
            axios.defaults.withCredentials=true;
              axios.get('/api/user').then((response)=>{
                 this.setState({
                  first_name:response.data.first_name,
                  last_name:response.data.last_name,
                  user_id:response.data.id,
                 })
                })
              }
     submitBid=()=>{
        const bidsref = firebase.database().ref("Bids"); 
        const bid = {
            date:this.state.date,
            username:this.state.first_name+" "+this.state.last_name,
            price:this.state.price,
            item_id:this.props.item_id,
            user_id:this.state.user_id
        }
      
        bidsref.push(bid);
      
        this.setState({price:""})
     } 
     closeDialogDet = () => {
        this.setState({error: false});
      };
    render(){
        if(!sessionStorage.getItem('loggedIn')){
            return <div style={{marginBottom:"10px",color:"#50a685"}}>Login To Submit A Bid </div>
        }
       
        return(
            <div>
                <input type="number" name="price" value={this.state.price}  className="num"  onChange={this.handleOnchange} />
                <button id="sb" onClick={this.submitBid}>Place Bid</button>

            </div>
        )
    }
}
export default AddBidD;