import React from 'react';
import Navbar from '../Components/Navbar'
import Slideshow from '../Components/Slideshow'
import welcome from '../images/welcome.jpeg'
import { MDBIcon } from 'mdbreact';
import '../style/MyAuctions.css'
import MainCategories from './MainCategories';
import ListCountries from './ListCountries'
import  SearchableMap from "./Mymap";

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
               <div className="search"  style={{'backgroundImage':`url(${welcome})`,backgroundSize:"100% 500px"}}>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <h1 >Bid, Win and Close with confidence !! </h1>
                    <input type="text" className="locs" placeholder=" Address, city, state, country..." />
                   <button className="buts"><MDBIcon icon="search"></MDBIcon></button>
                   </div>
                   <MainCategories/>
            </div>
        )
    }
}
export default welcomePage;