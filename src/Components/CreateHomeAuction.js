import React from 'react';
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
class CreateHomeAuction extends React.Component{
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
            images:[],
            setOpen:false
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
    handleClose = () => {
      this.setState({
        setOpen: false
      })
      this.props.closeD();
    };
   
    render(){
        return(
          <Dialog open={this.props.openD} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
        {/* <DialogTitle id="form-dialog-title">Choose Location</DialogTitle> */}
        <DialogContent style={{width:550,height:1000}}>
            {/* <div style={{marginLeft:"300px"}}> */}
              <Card style={{width:500}}>
            <CardHeader style={{backgroundColor:"#32b69b",color:"white"}}>
                <h2> Please Add Auction Details</h2>
            </CardHeader>
            <CardBody >
              <FormGroup>
            <Input type="date" name="start_date" defaultValue={this.state.start_date} onChange={this.handlechangeall} className="inputs" placeholder="Start Date"/>
            <Input type="date" name="planned_close_date" onChange={this.handlechangeall} className="inputs" placeholder="Close Date"/>
            <Input type="number" name="description" onChange={this.handlechangeall} className="input" placeholder="Description"/>
            <Input type="number" name="bedrooms" onChange={this.handlechangeall} className="inputs2" placeholder="Bedrooms"/>
            <Input type="number" name="bathrooms" onChange={this.handlechangeall} className="inputs2" placeholder="Bathrooms"/>
            <Input type="number" name="diningrooms" onChange={this.handlechangeall} className="inputs2" placeholder="Dining rooms"/>
            <Input type="number" name="Balcony" onChange={this.handlechangeall} className="inputs3" placeholder="Balconies"/>
            <Input type="number" name="parking" onChange={this.handlechangeall} className="inputs3" placeholder="Parkings"/>
            <Input type="number" className="inputs3" onChange={this.handlechangeall} name="starting_price" placeholder="Starting Price"/>
            <Input type="number" className="inputs3" onChange={this.handlechangeall} name="preffered_price" placeholder="Preferred Price"/> 
            </FormGroup>
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
                <DropdownButton  title="Home Type" id="dropdowntype"> 
                    <Dropdown.Item eventKey="option-1">Appartments/Studios</Dropdown.Item>
                    <Dropdown.Item eventKey="option-2">Industrial Buildings</Dropdown.Item> 
                    <Dropdown.Item eventKey="option-3">Houses</Dropdown.Item>
                    <Dropdown.Item eventKey="option-4">Villas</Dropdown.Item>
                    <Dropdown.Item eventKey="option-5">Buildings</Dropdown.Item>
                    <Dropdown.Item eventKey="option-6">Bungalows</Dropdown.Item>
                    <Dropdown.Item eventKey="option-7">Offices</Dropdown.Item>
                    <Dropdown.Item eventKey="option-8">Shops</Dropdown.Item> 
                    </DropdownButton>  
            <Input type="number" name="area" className="inputs3" onChange={this.handlechangeall} placeholder="Area"/>
          <div className="img inputs3">
           <ImageUploading
        onChange={this.onChange}
        maxNumber={maxNumber}
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
                <SearchableMap />
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
export default CreateHomeAuction;