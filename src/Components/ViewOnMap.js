import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import React from 'react'
import axios from 'axios'
import MapGL,{Marker,GeolocateControl,NavigationControl} from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import {MDBIcon } from "mdbreact";
import Axios from "axios";


const token = "pk.eyJ1IjoiaGFuZWVuLWFiaCIsImEiOiJja2loenFhZzgwMjZyMnRwZDJzemY1bWJlIn0.o_7zbsI02A3pS1a2-wfAuw" 

class SearchableMap extends React.Component {
  constructor(props){
    super(props);
  this.state = { 
    viewport :{
      latitude: 35.8623,
      longitude: 33.8547,
      zoom: 5,
    },
    long:0,
    lat:0,
    item_id:0,
    searchResultLayer: null
  }
  this.onClickMap = this.onClickMap.bind(this)
  }
  
  mapRef = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };
  onClickMap(e) {
    this.setState({
      long:e.lngLat[0],
      lat:e.lngLat[1]
    })
}

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      }),
    })
    console.log(event.result.geometry.coordinates[1])
    console.log(event.result.geometry.coordinates[0])
  }
  numberWithCommas(x) {
    if(x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
render(){
      const { viewport, searchResultLayer} = this.state
      const data=this.props.coordinates
      return (
        <div style={{ height: "90%"}}>
          <MapGL 
            ref={this.mapRef}
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            width="100%"
            height="100%"
            onClick={this.onClickMap}
            onViewportChange={this.handleViewportChange}
            mapboxApiAccessToken={token}
            >
              {data.map((item,index)=>

              <Marker key={index}  longitude={Number(item.longitude)} latitude={Number(item.latitude)}>
              <h2><h6 style={{backgroundColor:"white"}}>{this.numberWithCommas(item.area)} sqft</h6><MDBIcon icon="map-marker-alt" /></h2>
             </Marker>
              )}
              <div style={{display:"list-item",width:"40px",marginLeft:"10px", marginTop:"50px"}}>
                <Geocoder 
                mapRef={this.mapRef}
                onResult={this.handleOnResult}
                onViewportChange={this.handleGeocoderViewportChange}
                mapboxApiAccessToken={token}
                position='top-left'
              />
              <GeolocateControl
              positionOptions={{enableHighAccuracy: true}}
              trackUserLocation={true}
              fitBoundsOptions
              showUserLocation
              />
              <NavigationControl />

            </div>
            
            </MapGL>
        </div>
      )
    }
}

export default SearchableMap;