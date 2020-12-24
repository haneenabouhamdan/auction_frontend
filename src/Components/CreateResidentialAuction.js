import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    FormGroup
  } from "reactstrap";
  import '../style/MyAuctions.css';
  import SearchableMap  from './mymap';
  import ImageUploading from "react-images-uploading";
  const maxNumber = 20;
class CreateResidentialAuction extends React.Component{
    constructor(props){
        super(props);
        this.state={
            longitude:"",
            latitude:"",
            area:"",
            bedrooms:"",
            bathrooms:"",
            diningrooms:"",
            Balcony:"",
            parking:"",
            elevator:false,
            electricity:false,
            heating_cooling:false,
            start_date:"",
            planned_close_date:"",
            starting_price:"",
            preferred_price:"",
            category_id:"",
            images:[]
        }
    }
    onChange = (imageList) => {
        // data for submit
        //Getting total number of images
        var images = imageList.length
        // Create an object of formData 
        const formData = new FormData(); 
     
         //Saving multiple images in formadta varibale
         for(var a = 0; a<images; a++)
         {
          formData.append( 
            "myFile"+a, 
            imageList[a].file, 
            imageList[a].file.name
          ); 
          
         }
        //  this.setState({images:formData})
         console.log(imageList);
        //  axios.post("http://localhost/reactimageupload.php", formData); 
        }
      
    fileSelectedHandler = (e) => {
        this.setState({ images: [...this.state.images, ...e.target.files] })
      }
      handlechangeall = (event) =>{
        this.setState ( { [event.target.name] :event.target.value  } )
    }
   
    render(){
        return(
            <div>
              <Card style={{width:"500px"}}>
            <CardHeader style={{backgroundColor:"#32b69b",color:"white"}}>
                <h2> Please Add Auction Details</h2>
            </CardHeader>
            <CardBody >
            <Input type="date" name="start_date" onChange={this.handlechangeall} placeholder="Start Date" className="inputs"/>
            <Input type="date" name="planned_close_date" onChange={this.handlechangeall} className="inputs" placeholder="Close Date"/>
            <Input type="number" name="description" onChange={this.handlechangeall} className="input" placeholder="Description"/>
            <Input type="number" name="bedrooms" onChange={this.handlechangeall} className="inputs2" placeholder="Bedrooms"/>
            <Input type="number" name="bathrooms" onChange={this.handlechangeall} className="inputs2" placeholder="Bathrooms"/>
            <Input type="number" name="diningrooms" onChange={this.handlechangeall} className="inputs2" placeholder="Dining rooms"/>
            <Input type="number" name="Balcony" onChange={this.handlechangeall} className="inputs3" placeholder="Balconies"/>
            <Input type="number" name="parking" onChange={this.handlechangeall} className="inputs3" placeholder="Parkings"/>
            <Input type="number" className="inputs3" onChange={this.handlechangeall} name="starting_price" placeholder="Starting Price"/>
            <Input type="number" className="inputs3" onChange={this.handlechangeall} name="preffered_price" placeholder="Preferred Price"/>
                <FormGroup className="services">
                <label className="check">Elevator </label>
                <Input type="checkbox" className="check" onChange={this.handlechangeall} name="elevator" />
                </FormGroup>
                <FormGroup className="services">
                <label className="check">Electricity </label>
                <Input type="checkbox" className="check" onChange={this.handlechangeall} name="electricity" />
                </FormGroup>
                <FormGroup className="services">
                <label className="check">Heating and cooling </label>
                <Input type="checkbox" className="check" onChange={this.handlechangeall} name="heating_cooling" />
                </FormGroup>
            <Input type="number" name="area" className="inputt" onChange={this.handlechangeall} placeholder="Area"/>
            
            <label className="loc">Choose location</label>
            <div className="map">
                <SearchableMap />
            </div>
    
           <ImageUploading
        onChange={this.onChange}
        maxNumber={maxNumber}
        multiple
      >
        {({ imageList, onImageUpload }) => (
          // write your building UI
          <div className="imageuploader">
            <div className="mainBtns">
            <button className="btn btn-primary mr-1" onClick={onImageUpload}>Upload Image</button>
            
            </div>
            {imageList.map((image) => (
              <div className="imagecontainer" key={image.key}>
                <img src={image.dataURL} />
                
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
                <button type="submit" onClick={this.addAuction}>
                         Add Auction </button>
            </CardBody>
            </Card>
            </div>
        )
    }
}
export default CreateResidentialAuction;