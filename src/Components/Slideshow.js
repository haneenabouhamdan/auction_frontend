import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../style/Search.css'
const Slideshow = () => {
  const slideImages = [
    "https://modern-villas.com/wp-content/uploads/2018/08/Luxury-Villa-with-Seaviews-in-Javea-3.jpg",
    "https://www.slrlounge.com/wp-content/uploads/2014/07/973A2703-41.jpg",
    "https://88designbox.com/upload/2018/02/07/modern-house-in-la-canada.jpg",
    "https://i.pinimg.com/originals/92/5f/6f/925f6f3d13fd181bb03bee5ab2db51f3.jpg"

  ];

  return (
    <div>
      <div>
        <Slide duration="2000" style={{marginBottom:"10px",padding:"20px",width:"100%"}}> 
          <div className="each-slide">
            <div style={{width:"100%",height:"500px",'backgroundImage': `url(${slideImages[0]})`,backgroundSize:"100% 500px"}}>
            {/* <input type="text" placeholder="country"/> */}
            <span></span>
              {/* <img src={fadeImages[0]} style={{width:"100%",height:"500px"}} /> */}
            </div>
          </div>
          <div className="each-slide">
            <div style={{width:"100%",height:"500px",'backgroundImage': `url(${slideImages[1]})`,backgroundSize:"100% 500px"}}>
            <input type="text" placeholder="country"/>
            </div>
          </div>
          <div className="each-slide">
          
            <div style={{width:"100%",height:"500px",'backgroundImage': `url(${slideImages[2]})`,backgroundSize:"100% 500px"}}>
            <input type="text" placeholder="country"/>
            </div>
           
          </div>
          <div className="each-slide">
          <div style={{width:"100%",height:"500px",'backgroundImage': `url(${slideImages[3]})`,backgroundSize:"100% 500px"}}>
          <input type="text" placeholder="country"/>
            </div>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default Slideshow;


