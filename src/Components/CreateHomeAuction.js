import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import '../style/MyAuctions.css';
import {Redirect} from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {
    Card,
    CardHeader,
    CardBody,
    Label,
    Input,
    Row,
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
            description:"",
            bedrooms:"",
            bathrooms:"",
            diningrooms:"",
            Balcony:"",
            type:"",
            parking:"",
            elevator:false,
            electricity:false,
            heating_cooling:false,
            start_date:"",
            planned_close_date:"",
            starting_price:"",
            category:0,
            final_price:0,
            auction_categories_id:"",
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
        setOpen: false
      })
      this.props.closeD();
    };
    handlechangeEL=()=>{
      this.setState({
        elevator:!this.state.elevator
      })
    }
    handlechangeELC=()=>{
      this.setState({
        electricity:!this.state.electricity
      })
    }
    handlechangeHC=()=>{
      this.setState({
        heating_cooling:!this.state.heating_cooling
      })
    }
    onChangelong =(e)=>{
      this.setState({longitude:e})
      // console.log(this.state.longitude)
    }
    onChangelat =(e)=>{
      this.setState({latitude:e})
      // console.log(this.state.latitude)
    }
    handleSelectcat=(e)=>{
      console.log(e);
      switch(e){
        case '1':
          this.setState({auction_categories_id:1})
          break;
        case '2':
            this.setState({auction_categories_id:2})
          break;
          case '3':
            this.setState({auction_categories_id:3})
          break;
          case '4':
            this.setState({auction_categories_id:4})
          break;
      }
    }
    handleSelect=(e)=>{
      console.log(e);
      switch(e){
        case '1':
          this.setState({type:"Appartments/Studios"})
          break;
        case '2':
            this.setState({type:"Industrial Buildings"})
          break;
          case '3':
            this.setState({type:"Houses"})
          break;
          case '4':
            this.setState({type:"Villas"})
          break;
          case '5':
            this.setState({type:"Buildings"})
          break;
          case '6':
            this.setState({type:"Bungalows"})
          break;
          case '7':
            this.setState({type:"Offices"})
          break;
          case '8':
            this.setState({type:"Shops"})
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
      "auction_categories_id":this.state.auction_categories_id,
      "final_price":this.state.final_price,
      "caregory":this.state.category,
      "images":this.state.images
     }
     console.log(this.state);
     this.handleClose();
     axios.defaults.withCredentials=true;
     console.log(formData)
     axios.post('/api/addAuction',formData,{'Content-Type': 'multipart/form-data'}).then(response => {
       console.log(response)});
       window.location.reload();
       <Redirect to='/myauctions'/>
   }
    render(){
        return(
          <Dialog open={this.props.openD} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
        <DialogContent style={{width:550,height:1000}}>
              <Card style={{width:550}}>
            <CardHeader style={{backgroundColor:"#32b69b",color:"white"}}>
                <h2> Please Add Auction Details</h2>
            </CardHeader>
            <CardBody >
              <FormGroup>
              <Label style={{color:"grey",marginLeft:"10px"}}><h6>Start Date</h6></Label><Label style={{color:"grey",marginLeft:"200px",marginTop:"10px"}}><h6>Close Date</h6></Label><br/>
            <Row>
            <Input type="datetime-local" name="start_date" onChange={this.handlechangeall} className="inputs" placeholder="Start Date"/>
            <Input type="datetime-local" name="planned_close_date" onChange={this.handlechangeall} className="inputs" placeholder="Close Date"/>
            </Row>
            <Input type="text" name="description" onChange={this.handlechangeall} className="input" placeholder="Description"/>
            <Input type="number" name="bedrooms" onChange={this.handlechangeall} className="inputs2" placeholder="Bedrooms"/>
            <Input type="number" name="bathrooms" onChange={this.handlechangeall} className="inputs2" placeholder="Bathrooms"/>
            <Input type="number" name="diningrooms" onChange={this.handlechangeall} className="inputs2" placeholder="Dining rooms"/>
            <Input type="number" name="Balcony" onChange={this.handlechangeall} className="inputs3" placeholder="Balconies"/>
            <Input type="number" name="parking" onChange={this.handlechangeall} className="inputs3" placeholder="Parkings"/>
            <Input type="number" className="inputs3" onChange={this.handlechangeall} name="starting_price" placeholder="Starting Price"/>
                <DropdownButton  title="Category" id="dropdowntypee" onSelect={this.handleSelectcat}> 
                    <Dropdown.Item eventKey="1" >Residential</Dropdown.Item>
                    <Dropdown.Item eventKey="2" >Commercial</Dropdown.Item> 
                    <Dropdown.Item eventKey="3" >Industrial</Dropdown.Item>
                    <Dropdown.Item eventKey="4" >Others</Dropdown.Item>
                    </DropdownButton>  
                <DropdownButton  title="Home Type" id="dropdowntype" onSelect={this.handleSelect}> 
                    <Dropdown.Item eventKey="1">Appartments/Studios</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Industrial Buildings</Dropdown.Item> 
                    <Dropdown.Item eventKey="3">Houses</Dropdown.Item>
                    <Dropdown.Item eventKey="4">Villas</Dropdown.Item>
                    <Dropdown.Item eventKey="5">Buildings</Dropdown.Item>
                    <Dropdown.Item eventKey="6">Bungalows</Dropdown.Item>
                    <Dropdown.Item eventKey="7">Offices</Dropdown.Item>
                    <Dropdown.Item eventKey="8">Shops</Dropdown.Item> 
                    </DropdownButton>  
                    </FormGroup>
                <FormGroup className="services">
                <label className="check">Elevator </label>
                <Input type="checkbox" className="check" onChange={this.handlechangeEL} name="elevator" />
                </FormGroup>
                <FormGroup className="services">
                <label className="check">Electricity </label>
                <Input type="checkbox" className="check" onChange={this.handlechangeELC} name="electricity" />
                </FormGroup>
                <FormGroup className="services">
                <label className="check">Heating and cooling </label>
                <Input type="checkbox" className="check" onChange={this.handlechangeHC} name="heating_cooling" />
                </FormGroup>
            <Input type="number" name="area" className="inputs3" onChange={this.handlechangeall} placeholder="Area"/>
          <div className="img inputs3">
           <ImageUploading
        onChange={this.onChange}
        maxNumber={maxNumber}
        acceptType={['jpg', 'png', 'jpeg','webp']}
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
                <SearchableMap longitude={this.onChangelong} latitude={this.onChangelat}/>
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