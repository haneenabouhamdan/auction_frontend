
import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import '../App.css'
const Gallery = ({images}) => {
 
function handleClick(value){
    let v=  document.getElementsByName(value);
    v.className="enlarge";
  }
    const imagelist = images.map((value)=>{
           return  <img id={value.id} className="img" onClick={handleClick(value.id)} src={value.path}/>
    }     
    );
    
    return <div className="image-list">{imagelist}</div>;
  };
export default Gallery;