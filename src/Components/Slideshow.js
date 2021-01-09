import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../style/Search.css'
const Slideshow = ({images}) => {
  const slideImages = images;

  return (
    <div>
      <div>
        <Slide duration="2000" className="slide" > 
          {
            slideImages.map((value)=>
              <div key={value.id} className="each-slide">
              <img className="img" src={value.path}/>
  
            </div>
            )
          }
        </Slide>
      </div>
    </div>
  );
};

export default Slideshow;


