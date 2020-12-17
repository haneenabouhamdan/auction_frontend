
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Maps from "./Maps";

class Location extends Component {

  constructor(props){
    super(props);
    this.state={
      open: false,
      setOpen: false,
    }
  }  

  componentDidMount() {
  }
  
    handleClose = () => {
      this.setState({
        setOpen: false
      })
      this.props.closeD();
    };

   
    
 render(){ 
    return (
        <Dialog open={this.props.openD} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose Location</DialogTitle>
        <DialogContent style={{width:500,height:400}}>
        <Maps/>
        </DialogContent>
        <DialogActions style={{position:"fixed"}}>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    
    );
  }
}

export default Location;