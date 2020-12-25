import React from 'react'
import axios from 'axios';
import Slideshow from './Slideshow';
import {Redirect} from 'react-router-dom'
import '../style/MyAuctions.css';
import { DropdownButton ,Dropdown} from 'react-bootstrap';
import UserSidebar from './UserSidebar';
import CreateHomeAuction from './CreateHomeAuction';
import CreateLandAuction from './CreateLandAuction';

class MyAuctions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mybids:[],
            setOpen:false,
            setOpenL:false
        }
    }
    addImage=(file)=>
    {
      this.setState({ 
        image: file[0],
      })
    }
    handleClickOpen = () => {
    this.setState({setOpen:true});
  };
   closeDialog = () => {
    this.setState({setOpen: false});
  };
  handleClickOpenL = () => {
    this.setState({setOpenL:true});
  };
   closeDialogL = () => {
    this.setState({setOpenL: false});
  };
  logout = e => {
    e.preventDefault();
    axios.get("/sanctum/csrf-cookie").then(response => {
      axios.post("/logout").then(res => {
        sessionStorage.removeItem('loggedIn');
        this.props.history.push('/login');
      });
    });
};
    render(){
          if(this.state.setOpen) {
      return <CreateHomeAuction openD={this.state.setOpen} closeD={this.closeDialog}/>
         }
         if(this.state.setOpenL){
           return <CreateLandAuction openL={this.state.setOpenL} closeL={this.closeDialogL}/>
         }
        return(
            <div>
                <UserSidebar/>
                <div id="myaucnav">
                <DropdownButton  title="Create Auction" id="dropdown" style={{marginLeft:"950px"}}> 
                    <Dropdown.Item href=""><a href="/home" className="drop" onClick={this.handleClickOpen}>Houses</a></Dropdown.Item>
                    <Dropdown.Item href=""><a href="/land" className="drop" onClick={this.handleClickOpenL}>Lands</a></Dropdown.Item>
                    </DropdownButton>   
                      <button id="btn-logout" onClick={this.logout}>Logout</button>
                
            </div>
            </div>
        )
    }
}
export default MyAuctions;