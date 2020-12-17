import React from "react";
import axios from "axios";
import ind from '../images/ind.jpeg';
import com from '../images/com.jpeg';
import hom from '../images/hom.jpeg';
import '../style/User.css';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import { MDBIcon } from "mdbreact";

class MainCategories extends React.Component {
    constructor(props){
        super(props);
        this.state={
        }
        }
    render(){
        return(
            <div style={{padding:"20px"}}>  
             <div>
            <Row className="row">
            <Col className="MCol">
            <Card className="MsmallCard">
                <CardHeader style={{backgroundColor:"white",height:"150px"}}>
                <img className="imageA" src={ind} />               
                </CardHeader>
                <CardBody>
                <h5>Residential Properties </h5> 
                <span className="desc">Say hello to dream home !!
                    fast, easy and effective search in your desired location. Checkout our
                    properties and get the chance to win a bid insuring ultimate security.
                </span>
                </CardBody>
                </Card>    
                 </Col>
            <Col  className="MCol">
            <Card className="MsmallCard">
                <CardHeader style={{backgroundColor:"white",height:"150px"}}>
                <img className="imageA" src={com} />
                </CardHeader>
                <CardBody>
                <h5>Commercial Properties </h5>
                <span className="desc"></span>
                </CardBody>
                </Card>    
                 </Col>
                 <Col  className="MCol">
            <Card className="MsmallCard">
                <CardHeader style={{backgroundColor:"white",height:"150px"}}>
                <img className="imageA" src={hom} />
                </CardHeader>
                <CardBody>
                <h5>Industrial Properties </h5>
                <span></span>
                </CardBody>
                </Card>    
                 </Col>
              </Row>
              </div>
            </div>
        )
    }
}
 export default MainCategories;    
    