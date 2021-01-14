import firebase from "../utils/firebase";
import React from "react";
class CountBids extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       num:0
    }
    // this.getCountBids=this.getCountBids.bind(this)
  }
  componentDidMount(){
      this.getCountBids();
  }
getCountBids=()=> {
  const id = this.props.id;
  console.log(id)
    firebase.database().ref('Bids').orderByChild('item_id').equalTo(id).on("value", function(snapshot) {
      var totalRecord =  snapshot.numChildren();
      console.log("Total Record : "+totalRecord);
      return totalRecord;
    // this.setState({num:totalRecord})
  })
  
}

render(){
    return(
        <i key={this.props.id}>
            {()=>this.getCountBids()}
            
        </i>
    )
}
} 
export default CountBids;