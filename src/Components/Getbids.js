import React from 'react';
import firebase from '../utils/firebase';
import '../style/MyAuctions.css'
class Getbids extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bids:[],
           
         }
        }
        componentDidMount=()=>{
            this.getBids();
        }
    getBids=()=>{
        const bidsref = firebase.database().ref("Bids");
        bidsref.on('value',(snapshot)=>{
            const bids = snapshot.val();
            const list=[];
            for(let id in bids){
                list.push(bids[id]);
                
            }
            
            this.setState({bids:list});
            // console.log(this.state.bids)
        })
        

    }
  
    render(){
        if(!sessionStorage.getItem('loggedIn')){
            return <div style={{marginBottom:"10px",color:"red"}}>Login To Submit A Bid !!</div>
        }
        return(
            <div>
                
                {this.state.bids ? this.state.bids.map((bid,index)=>{
                    // {console.log(bid.price)}
                   <h2>{bid.price}</h2> 
                }):""
            }
            </div>
        )
    }
}
export default Getbids;