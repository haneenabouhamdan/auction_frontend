// import React from "react";
// // react plugin used to create google maps
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Map,
//   Marker,
//   GoogleApiWrapper
// } from "react-google-maps";
// // reactstrap components
// import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
// const MapWrapper = withScriptjs(
//   withGoogleMap(props => (
//     <GoogleMap
//       onClick={(e) => { props.onHandleClick(e) }}
//       defaultZoom={10}
//       defaultCenter={{ lat: props.x, lng: props.y }}
//       options={{
//         streetViewControl: false,
//         draggable: true, // make map draggable
//         zoomControlOptions: { position: 9 },
//         keyboardShortcuts: false, // disable keyboard shortcuts
//         scaleControl: true, // allow scale controle
//         mapTypeControl: true,
//         mapTypeControlOptions: {
//           style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
//           mapTypeIds: ["roadmap", "terrain"],
//         }
//       }}
//        >
//       <Marker position={{ lat: props.x, lng: props.y }} />
//     </GoogleMap>
//   ))
// );
// class Maps extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       x: 33.858,
//       y: 35.7000,
//     };
//   }
//   componentWillMount() {
//     if (this.props.xValue != null && this.props.yValue != null) {
//       this.setState({ x: this.props.xValue, y: this.props.yValue });
//     }
//   }
//   sendLoc = (e) => {
//     if (this.props.x != undefined) {
//       this.setState({ x: e.latLng.lat(), y: e.latLng.lng() });
//       this.props.x(e.latLng.lat()); this.props.y(e.latLng.lng());
//     }
//   }
//   render() {
//     return (
//       <>
//         <div className="content">
//           <Row>
//             <Col md="12">
//               <Card className="card-plain">
//                 <CardHeader>Google Maps</CardHeader>
//                 <CardBody>
//                   <div
//                     id="map"
//                     className="map"
//                     style={{ position: "relative", overflow: "hidden" }}
//                   >
//                     <MapWrapper
//                       x={this.state.x}
//                       y={this.state.y}
                      
//                       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCr4wBaXfSuCmv2lEjaXdtSZuVRTjQ1iAc"
//                       loadingElement={<div style={{ height: `100%` }} />}
//                       containerElement={<div style={{ height: `100%` }} />}
//                       mapElement={<div style={{ height: `100%` }} />}
//                       onHandleClick={(e) => { this.sendLoc(e) }}
//                     />
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </>
//     );
//   }
// }
// export default Maps;