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
                <a href='/residentialItems'>
                <img className="imageA" src={hom}/>
                </a>           
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
                <a href='/commercialItems'>
                <img className="imageC" src={com} /></a>
                </CardHeader>
                <CardBody>
                <h5>Commercial Properties </h5>
                <span className="desc">You can find data on prices,vacancies,
                supply and stock of commercial properties in this sections.
                Check it out and start your business at an awesome place!!</span>
                </CardBody>
                </Card>    
                 </Col>
                 <Col  className="MCol">
            <Card className="MsmallCard">
                <CardHeader style={{backgroundColor:"white",height:"150px"}}>
                <a href='/industrialItems'>
                <img className="imageB" src={ind} /></a>
                <Row></Row>
                </CardHeader>
                <CardBody>
                <h5>Industrial Properties </h5>
                <span className="desc">The website features properties across all asset classes, 
                    including industrial land and building for sale. Listings generally include property
                    information, space-level detail, photos, aerial views.</span>
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
    