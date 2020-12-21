// import React from "react";
// import axios from "axios";
// import '../style/User.css';
// // reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   CardTitle,
//   FormGroup,
//   Form,
//   Input,
//   Row,
//   Col,
// } from "reactstrap";
// import ListCountries from "./ListCountries";
// import { MDBIcon } from "mdbreact";

// class Categories extends React.Component {
//     constructor(props){
//         super(props);
//         this.state={
//         }
//         }
//     render(){
//         return(
//             <div style={{padding:"20px"}}>  
            
//                 <div>
//                 <h2 style={{textAlign:"left",marginTop:"20px",color:"grey"}}>Residential Properties</h2>
//             <Row className="row">
//             <Col className="Col">
//             <Card className="XsmallCard">
//                 <CardHeader style={{backgroundColor:"white",height:"150px"}}>
//                 <img className="imageA" src="https://www.wallpapertip.com/wmimgs/172-1721269_luxury-dark-living-room-modern-luxury-studio-apartments.jpg" />
//                 </CardHeader>
//                 <CardBody>
//                 Appartments/Studios
//                 </CardBody>
//                 </Card>    
//                  </Col>
//             <Col  className="Col">
//             <Card className="XsmallCard">
//                 <CardHeader style={{backgroundColor:"white",height:"150px"}}>
//                 <img className="imageA" src="https://i.pinimg.com/originals/a2/9d/22/a29d22ca05c92a39e79acc6adc638218.jpg" />
//                 </CardHeader>
//                 <CardBody>
//                 Houses
//                 </CardBody>
//                 </Card>    
//                  </Col>
//                  <Col  className="Col">
//             <Card className="XsmallCard">
//                 <CardHeader style={{backgroundColor:"white",height:"150px"}}>
//                 <img className="imageA" src="https://www.realista.com/wp-content/uploads/2017/06/Los-Olivos-Nueva-Andalucia-Marbella-new-modern-villa-project_Realista-Quality-properties-Marbella_villa-17.jpg" />
//                 </CardHeader>
//                 <CardBody>
//                 Villas
//                 </CardBody>
//                 </Card>    
//                  </Col>
//                  <Col  className="Col">
//             <Card className="XsmallCard">
//                 <CardHeader style={{backgroundColor:"white",height:"150px"}}>
//                 <img className="imageA" src="https://www.ep-architects.com/wp-content/uploads/2018/11/3-small-e1552582395190.jpg" />
//                 </CardHeader>
//                 <CardBody>
//                 Buildings
//                 </CardBody>
//                 </Card>    
//                  </Col>
//                  <Col  className="Col">
//             <Card className="XsmallCard">
//                 <CardHeader style={{backgroundColor:"white",height:"150px"}}>
//                 <img className="imageA" src="https://wallpapercave.com/wp/GWnYl0s.jpg" />
//                 </CardHeader>
//                 <CardBody>
//                 Bungalows
//                 </CardBody>
//                 </Card>    
//                  </Col>
//                </Row>
//                  </div>
//                  <div>
//                  <h2 style={{textAlign:"left",marginTop:"20px",color:"grey"}}>Commercial Properties</h2>
//                      <Row>
//                      <Col  className="Col">
//                     <Card className="XsmallCard">
//                         <CardHeader style={{backgroundColor:"white",height:"150px"}}>
//                         <img className="imageA" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYYujyqqC5WRy9KSW4rVE7CtfLIjfD2oqnTw&usqp=CAU" />
//                         </CardHeader>
//                         <CardBody>
//                         Offices
//                         </CardBody>
//                         </Card>    
//                         </Col>
//                         <Col  className="Col">
//                     <Card className="XsmallCard">
//                         <CardHeader style={{backgroundColor:"white",height:"150px"}}>
//                         <img className="imageA" src="https://previews.123rf.com/images/tsxmax/tsxmax1502/tsxmax150200035/36459344-bekery-shop-front-in-mall-shop-store-singapore-09-october-2014.jpg" />
//                         </CardHeader>
//                         <CardBody>
//                         Shops
//                         </CardBody>
//                         </Card>    
//                         </Col>
//                         <Col  className="Col">
//                         <Card className="XsmallCard">
//                         <CardHeader style={{backgroundColor:"white",height:"150px"}}>
//                         <img className="imageA" src="https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
//                         </CardHeader>
//                         <CardBody>
//                         Industrial Buildings
//                         </CardBody>
//                         </Card>    
//                         </Col>
//                      </Row>
//                  </div>
//                  <div>
//                  <h2 style={{textAlign:"left",marginTop:"20px",color:"grey"}}>Lands</h2>
//                      <Row>
//                  <Col  className="Col">
                 
//             <Card className="XsmallCard">
//                 <CardHeader style={{backgroundColor:"white",height:"150px"}}>
//                 <img className="imageA" src="https://photos-a.propertyimages.ie/media/4/2/9/4438924/3fea698d-2a44-4761-ab11-84e769da9347_l.jpg" />
//                 </CardHeader>
//                 <CardBody>
//                Residential/Commercial Lands
//                 </CardBody>
//                 </Card>    
//                  </Col>
//                  <Col  className="Col">
//             <Card className="XsmallCard">
//                 <CardHeader style={{backgroundColor:"white",height:"150px"}}>
//                 <img className="imageA" src="https://www.gruposantacatarina.com/wp-content/uploads/sites/3/2015/12/foto_terreno-2.jpg" />
//                 </CardHeader>
//                 <CardBody>
//                Industrial Lands
//                 </CardBody>
//                 </Card>    
//                  </Col>
//                  <Col  className="Col">
//             <Card className="XsmallCard">
//                 <CardHeader style={{backgroundColor:"white",height:"150px"}}>
//                 <img className="imageA" src="https://kirilovalaw.com/wp-content/uploads/2016/07/Agricultural-Land.jpg" />
//                 </CardHeader>
//                 <CardBody>
//                Agricultural Lands
//                 </CardBody>
//                 </Card>    
//                  </Col>
//               </Row>
//               </div>
//             </div>
//         )
//     }
// }
//  export default Categories;    
    