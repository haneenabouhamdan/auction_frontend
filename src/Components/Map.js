// import React, { useState } from "react";
// import ReactMapGL from "react-map-gl";
// import { useDispatchMap } from "./mapHook";
// import { Markers } from "./Markers";

// export const Map = () => {
//   const mapDispatch = useDispatchMap();

//   const [mapViewport, setMapViewport] = useState({
//     height: "100vh",
//     width: "100wh",
//     longitude:  33.8547, 
//     latitude: 35.8623,
//     zoom: 5
//   });

//   return (
//     <ReactMapGL
//       {...mapViewport}
//       mapboxApiAccessToken="pk.eyJ1IjoiaGFuZWVuLWFiaCIsImEiOiJja2loenFhZzgwMjZyMnRwZDJzemY1bWJlIn0.o_7zbsI02A3pS1a2-wfAuw"
//       mapStyle="mapbox://styles/mapbox/streets-v11"
//       onViewportChange={setMapViewport}
//       onClick={x => {
//         x.srcEvent.which === 1 &&
//           mapDispatch({ type: "ADD_MARKER", payload: { marker: x.lngLat } });
//           {console.log(x.lngLat)}
//       }}
//     >
//       <Markers />
//     </ReactMapGL>
//   );
// };
