import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../style/Search.css'
const Slideshow = ({images}) => {
  const slideImages = images;

  return (
    <div>
      <div>
        <Slide duration="2000" style={{marginBottom:"10px",padding:"5px",width:"100%"}}> 
          {
            slideImages.map((value)=>
              <div key={value.id} className="each-slide">
              <img style={{width:"100%",height:"200px"}} src={value.path}/>
  
            </div>
            )
          }
        </Slide>
      </div>
    </div>
  );
};

export default Slideshow;


