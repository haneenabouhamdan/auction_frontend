import SmartGallery from 'react-smart-gallery';
import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import '../App.css'
import { Slide } from 'react-slideshow-image';
const SGallery = ({images}) => {
 const slideIt=()=>{
     return(
        <Slide duration="2000" className="slide" > 
        {
          images.map((value)=>
            <div key={value.id} className="each-slide">
            <img className="img" src={value.path}/>

          </div>
          )
        }
      </Slide>
     )
 }
const imgs=[];
    const imagelist = images.map((value)=>{
        // console.log(value.path)
        imgs.push(value.path);
    }     
    );
    
    return <SmartGallery width={950} height={500} rootStyle={{boxShadow: '2px 2px 2px #0000 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1)'}} onImageSelect={(event, src) => window.open(src)} onLoad={slideIt()} images={imgs} />
  };
export default SGallery;