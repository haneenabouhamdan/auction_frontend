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
  componentDidMount(){
      this.getCountBids();
  }
getCountBids=()=> {
  const ids = this.props.id;
  const bidsref = firebase.database().ref("Bids");
  bidsref.on("value", (snapshot) => {
    const lists = snapshot.val();
    const list = [];
    for (let id in lists) {
      // console.log(lists[id]);
      if(lists[id].item_id === ids)
      list.push(lists[id]);
    }
    // console.log(list.length)
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