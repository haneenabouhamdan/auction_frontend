import React from 'react';
import Navbar from '../Components/Navbar'
import Categories from '../Components/Categories'
// import Map from '../Components/Maps'
import Slideshow from '../Components/Slideshow'
import welcome from '../images/welcome.jpeg'
import { MDBIcon } from 'mdbreact';
import MainCategories from './MainCategories';
// import Maps from './Maps';
import { Map } from "./Map";
import { MapProvider } from "./mapHook";
import  SearchableMap from "./mymap";

// import InitMap from '../Components/Maps';
class welcomePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    render(){
        return (
            <div className="home">
               <Navbar/>
               <div style={{width:"100%",height:"400px",'backgroundImage':`url(${welcome})`,backgroundSize:"100% 500px"}}>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <h1 style={{color:"white",fontFamily:"Cursive",textShadow:"10px 10px 15px white"}}>Bid, Win and Close with confidence !! </h1>
                    <input type="text" style={{width:"500px",height:"50px",border:"0",marginTop:"50px"}} placeholder=" Address, city, state, country..." />
                   <button style={{backgroundColor:'transparent',color:"white",fontStyle:"bold",height:"52px",width:"52px",marginBottom:"2px",border:"0"}}><MDBIcon icon="search"></MDBIcon></button>
                   </div>
                   <MainCategories/>
                 
                {/* <SearchableMap/> */}
                   
               {/* <Slideshow/> */}
               {/* <Categories/> */}
                {/* <Map/> */}
            </div>
        )
    }
}
export default welcomePage;