import firebase from "../utils/firebase";
import React from "react";
class CountBids extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       num:0
    }
    this.getCountBids=this.getCountBids.bind(this)
  }
 async componentDidMount(){
    await  this.getCountBids();
  }
getCountBids=()=> {
  const ids = this.props.id;
  // firebase.database().ref.child("Bids.item_id").once('value', function (userStoreSnapshot) {
  //   console.log(userStoreSnapshot.numChildren());
  // });
  const bidsref = firebase.database().ref("Bids");
  bidsref.on("value", (snapshot) => {
    const lists = snapshot.val();
    let count = 0;
    let list = [];
    for (const  [key , value] of Object.entries(lists)) {
      if(value.item_id == ids){
        list.push(value);
      }
    }
    // console.log(list.length)
    console.log(snapshot.numChildren())
    this.setState({ num: list.length });
  });
}

render(){
    return(
        <strong key={this.props.id} style={{color:"grey"}}>
            {/* {()=>this.getCountBids()} */}
            {this.state.num}
            
        </strong>
    )
}
} 
export default CountBids;