import React from 'react';
import Notifications from "react-notifications-menu"
import firebase from '../utils/firebase';
import '../style/MyAuctions.css'
const data=[];
class Notification extends React.Component{
    constructor(props){
        super(props);
        this.state={
            notification:[],
        }
    }
    componentDidMount(){
        this.getNotsHistory();
    }
    getNotsHistory=()=>{
        const bidsref = firebase.database().ref("Notifications");
        bidsref.on('value',(snapshot)=>{
            const lists = snapshot.val();
            const list=[];
            for(let id in lists){
                list.push(lists[id]);   
            }
            console.log(list)
            
            {list.map((i)=>{
                console.log(i)
              const is = {
                  "item_id":i.item_id,
                  "message":i.message,
                  "owner":i.owner,
                  "closeDate":i.closeDate
              }
              data.push(is)
            })
          }
            // this.setState({notification:list});
        })
      }
      render(){
       
          return(
            <Notifications
            data={data}
            width="300px"
            height="300px"
            markAsRead={data => console.log(data)}
            header={{
                title: 'Notifications',
                option: { text: 'View All', onClick: () => console.log('Clicked') },
            }}
            icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAxVe524RwKUyTb0aHtfYrSRvwOa0VfcAY9w&usqp=CAU"
            />
          )
      }
}
export default Notification;