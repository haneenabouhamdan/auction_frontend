import axios from 'axios';
import React from 'react';
import * as turf from '@turf/turf';
class Near extends React.Component{
    constructor(props){
        super(props);
        this.state={
            distance:0,
            auctions:[],
            coordinates:[],
            longitude:0,
            auc:[],
            latitude:0,
            min:0,
            item_id:0
        }
        this.locate = this.locate.bind(this);
    }
    componentDidMount(){
        axios.defaults.withCredentials=true;
        axios.get('/api/getAllAuctions').then((res)=>{
            this.setState({auc:res.data.items.data})
            const coor=res.data.items.data;
            coor.map((item)=>{
                var c = new Object();
                c.longitude=item.longitude
                c.latitude=item.latitude
                c.id=item.id
                this.state.coordinates.push(c);
        })
    })
    this.locate();
    this.getDistance();
    }
    locate(){
        // console.log('test')
        window.onload = function() {
          var startPos;
          var geoSuccess = function(position) {
            //   console.log(position, 'posiitionposition');
            startPos = position;
            this.setState({latitude:startPos.coords.latitude,longitude:startPos.coords.longitude})
            // console.log(startPos.coords.latitude);
        //    console.log(startPos.coords.longitude);
          
          }.bind(this);
          navigator.geolocation.getCurrentPosition(geoSuccess);
        }.bind(this);
        }
    distance(lng,lat){
    var to = [lng, lat] //lng, lat
    // console.log(to);
    var from = [this.state.longitude, this.state.latitude] //lng, lat 
    // console.log(from)
    var options = { units: 'kilometers' };
    var distance = turf.distance(to, from, options);
    return distance;
    // var value = document.getElementById('distance')
    // value.innerHTML = 
    // console.log("Distance: " + distance + " Km")
    }
    getDistance(){
        let data= this.state.auc;
      
      data.map((i)=>{
        let d =  this.distance(i.longitude,i.latitude);
        if(d < this.state.min){
            this.setState({
                min:d,
                item_id:i.id
            })
        }
        console.log(d)
      })
     
  
    }
    render(){
        const coor=this.state.coordinates;
        const data = this.state.auc;
        return(
            <div id="distance">
                {/* {coor.map((i)=>
                    this.distance(i.longitude,i.latitude)
                )
            } */}
            
            <h3>{this.state.item_id}, {this.state.min}</h3>
            </div>
        )
    }
}
export default Near;