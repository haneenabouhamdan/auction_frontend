import React from 'react';
import firebase from '../utils/firebase';
import '../style/MyAuctions.css'
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
            date:new Date(),
            price:0,
         }
        }
        handleOnchange=(event)=>{
            this.setState ( { [event.target.name] :event.target.value  } )
        }
        componentDidMount() {
            axios.defaults.withCredentials=true;
              axios.get('/api/user').then((response)=>{
                //   console.log(response.data.first_name);
                 this.setState({
                  first_name:response.data.first_name,
                  last_name:response.data.last_name
                 })
                })
              }
     submitBid=()=>{
        const bidsref = firebase.database().ref("Bids");
        // console.log(bidsref)
        
        const bid = {
            date:this.state.date,
            username:this.state.first_name+" "+this.state.last_name,
            price:this.state.price,
            item_id:this.props.item_id,
            
        }
        bidsref.push(bid);
     } 
  
    render(){
        if(!sessionStorage.getItem('loggedIn')){
            return <div style={{marginBottom:"10px",color:"red"}}>Login To Submit A Bid !!</div>
        }
        return(
            <div>
                
                <input type="number" className="price" name="price" onChange={this.handleOnchange}/>
            
                <button type="submit" className="but" onClick={this.submitBid}>Submit a bid</button>

            </div>
        )
    }
}
export default AddBid;