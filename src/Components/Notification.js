import React from "react";
import Notifications from "react-notifications-menu";
import firebase from "../utils/firebase";
import axios from "axios";
import "../style/MyAuctions.css";
const data = [];
class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: [],
      user_id: 0,
    };
  }
  async componentDidMount() {
    axios.defaults.withCredentials = true;
    await axios.get("/api/user").then((response) => {
      this.setState({ user_id: response.data.id });
    });
    await this.getNotsHistory();
  }
  getNotsHistory = () => {
    const bidsref = firebase.database().ref("Notifications");
    bidsref.on("value", (snapshot) => {
      const lists = snapshot.val();
      const list = [];
      for (let id in lists) {
        list.push(lists[id]);
      }
      // console.log(list);

      {
        list.map((i) => {
          // console.log(i);
          if (i.owner_id != this.state.user_id) {
            const is = {
              item_id: i.item_id,
              message: i.message + "  " + "  added by " + i.owner,
              owner: i.owner,
              closeDate: i.closeDate,
              image: i.image,
              flag: i.flag,
            };
            data.push(is);
          }
          //   console.log(data)
        });
      }
    });
  };
  // setFlag(data){
  //   // console.log(data)
  //    const bidsref = firebase.database().ref("Notifications");
  //    bidsref.on("value", (snapshot) => {
  //      if(data.owner_id==snapshot.val().owner_id){
  //        console.log(snapshot.child(snapshot.key))
  //     bidsref.child().update({'flag':1})
  //     }
  //   }
  //    )
  // }
  render() {
    return (
      <div id="container">
      <Notifications
        data={data}
        markAsRead={(data) => this.setFlag(data)}
        header={{
          option: { text: "View All", onClick: () => console.log("d") },
        }}
        icon="data:image/jpeg;base64,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"
      ></Notifications>
      </div>
    );
  }
}
export default Notification;
