import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import '../style/MyAuctions.css'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    FormGroup
  } from "reactstrap";
  import '../style/MyAuctions.css';
  import SearchableMap  from './Mymap';
  import { DropdownButton ,Dropdown} from 'react-bootstrap';
  import ImageUploading from "react-images-uploading";
  const maxNumber = 20;
class CreateLandAuction extends React.Component{
    constructor(props){
        super(props);
        this.state={
            longitude:"",
            latitude:"",
            area:"",
            bedrooms:0,
            bathrooms:0,
            diningrooms:0,
            Balcony:0,
            type:"",
            parking:0,
            elevator:false,
            electricity:false,
            heating_cooling:false,
            start_date:"",
            planned_close_date:"",
            starting_price:"",
            preferred_price:"",
            final_price:0,
            auction_categories_id:"",
            images:[],
            setOpenL:false
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
         this.setState({images:imageList})
         console.log(imageList);
        //  axios.post("http://localhost/reactimageupload.php", formData); 
        }
      
    fileSelectedHandler = (e) => {
        this.setState({ images: [...this.state.images, ...e.target.files] })
      }
      handlechangeall = (event) =>{
        this.setState ( { [event.target.name] :event.target.value  } )
    }
    handleClose = () => {
      this.setState({
        setOpenL: false
      })
      this.props.closeL();
    };
    onChangelong =(e)=>{
      this.setState({longitude:e})
      // console.log(this.state.longitude)
    }
    onChangelat =(e)=>{
      this.setState({latitude:e})
      // console.log(this.state.latitude)
    }

    handleSelect=(e)=>{
      console.log(e);
      switch(e){
        case '1':
          this.setState({type:"Residential",auction_categories_id:"1"})
          break;
        case '2':
            this.setState({type:"Commercial",auction_categories_id:"2"})
          break;
          case '3':
            this.setState({type:"Industrial",auction_categories_id:"3"})
          break;
          case '4':
            this.setState({type:"Agricultural",auction_categories_id:"4"})
          break;
          case '5':
            this.setState({type:"Others",auction_categories_id:"4"});
            break;
      }
    }
    onSubmit = ()=>{
      let formData={
       "longitude":this.state.longitude,
       "latitude":this.state.latitude,
       "area":this.state.area,
       "description":this.state.description,
       "bedrooms":this.state.bedrooms,
       "bathrooms":this.state.bathrooms,
       "diningrooms":this.state.diningrooms,
       "Balcony":this.state.Balcony,
       "parking":this.state.parking,
       "type":this.state.type,
       "elevator":this.state.elevator,
       "electricity":this.state.electricity,
       "heating_cooling":this.state.heating_cooling,
       "start_date":this.state.start_date,
       "planned_close_date":this.state.planned_close_date,
       "starting_price":this.state.starting_price,
       "preferred_price":this.state.preferred_price,
       "auction_categories_id":this.state.auction_categories_id,
       "final_price":this.state.final_price,
       "images":this.state.images
      }
      console.log(this.state.images);
      this.handleClose();
      axios.defaults.withCredentials=true;
      axios.post('/api/addAuction',formData,{'Content-Type': 'multipart/form-data'}).then(response => {
        console.log(response)});
    }
    render(){
        return(
          <Dialog open={this.props.openL} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
        <DialogContent style={{width:550,height:1000}}>
              <Card style={{width:500}}>
            <CardHeader style={{backgroundColor:"#32b69b",color:"white"}}>
                <h2> Please Add Auction Details</h2>
            </CardHeader>
            <CardBody >
              <FormGroup>
            <Input type="datetime" name="start_date" onChange={this.handlechangeall} className="inputs" placeholder="Start Date"/>
            <Input type="datetime" name="planned_close_date" onChange={this.handlechangeall} className="inputs" placeholder="Close Date"/>
            <Input type="text" name="description" onChange={this.handlechangeall} className="input" placeholder="Description"/>
            <Input type="number" className="inputs3" onChange={this.handlechangeall} name="starting_price" placeholder="Starting Price"/>
            <Input type="number" className="inputs3" onChange={this.handlechangeall} name="preffered_price" placeholder="Preferred Price"/> 
            </FormGroup>
                <DropdownButton  title="Land Type" id="dropdowntype" onSelect={this.handleSelect}> 
                    <Dropdown.Item eventKey="1">Residential</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Commercial</Dropdown.Item> 
                    <Dropdown.Item eventKey="3">Industrial</Dropdown.Item>
                    <Dropdown.Item eventKey="4">Agricultural</Dropdown.Item>
                    <Dropdown.Item eventKey="5">Others</Dropdown.Item>
                    </DropdownButton>  
            <Input type="number" name="area" className="inputs3" onChange={this.handlechangeall} placeholder="Area"/>
          <div className="img inputs3">
           <ImageUploading
        onChange={this.onChange}
        maxNumber={maxNumber}
        acceptType={['jpg', 'png', 'jpeg']}
        id="img"
        multiple
      >
        {({ imageList, onImageUpload }) => (
          // write your building UI
          <div className="imageuploader">
            <div className="mainBtns">
            <button className="btn btn-primary mr-1" onClick={onImageUpload}>Upload Images</button>
            
            </div>
            {imageList.map((image) => (
              <div className="imagecontainer" key={image.key}>
                <img src={image.dataURL} />
                
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      </div>
      <label className="loc">Choose location</label>
            <div className="map">
                <SearchableMap longitude={this.onChangelong} latitude={this.onChangelat} />
            </div>
          </CardBody>
            </Card>
            </DialogContent>
            <DialogActions style={{float:"inline-end"}}>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
        )
    }
}
export default CreateLandAuction;