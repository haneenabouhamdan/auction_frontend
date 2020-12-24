import React from 'react'
import Slideshow from './Slideshow';
import '../style/MyAuctions.css';
import { DropdownButton ,Dropdown,Item} from 'react-bootstrap';
import {
    Card,
    CardHeader,
    CardBody,
  } from "reactstrap";
import UserSidebar from './UserSidebar';


class MyAuctions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mybids:[]
        }
    }
    addImage=(file)=>
    {
      this.setState({ 
        image: file[0],
      })
    }
    render(){
        return(
            <div>
                <UserSidebar/>
            <Card style={{width:"85%",marginLeft:"240px",height:"60px",border:"0"}}>
                <DropdownButton  title="Create Auction" id="dropdown" style={{marginLeft:"600px"}}> 
                    <Dropdown.Item href="/residential">Residential Property</Dropdown.Item>
                    <Dropdown.Item href="/commercial">Commercial Property</Dropdown.Item>
                    <Dropdown.Item href="/industrial">Industrial Property</Dropdown.Item>
                    </DropdownButton>
        
            </Card>
            </div>
        )
    }
}
export default MyAuctions;