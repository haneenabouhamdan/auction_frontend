import React from 'react';
import firebase from '../utils/firebase';
import '../App.css'
import axios from 'axios';
class AddBid extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bids:[],
            user_id:0,
            first_name:"",
            last_name:"",
            item_id:0,
            balance:0,
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
                // console.log(response)
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
            username:this.state.first_name+" "+this.state.last_name,
            price:this.state.price,
            item_id:this.props.item_id,
            user_id:this.state.user_id
        }
        // if(this.state.balance > this.state.price){
        bidsref.push(bid);
        // }
        // else{
        //   this.setState({error:true})
        // }
        this.setState({price:""})
     } 
     closeDialogDet = () => {
        this.setState({error: false});
      };
    render(){
        if(!sessionStorage.getItem('loggedIn')){
            return <div style={{marginBottom:"10px",color:"#92d1bb"}}>Login to Submit A Bid </div>
        }
       
        return(
            <div>
                <input type="number" value={this.state.price} className="bid" name="price" placeholder="$" onChange={this.handleOnchange}/>
            
                <button type="submit" className="subid" onClick={this.submitBid}>Bid</button>

            </div>
        )
    }
}
export default AddBid;