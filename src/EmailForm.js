import React from 'react';
import axios from 'axios';

export default class extends React.Component {
  constructor(props) {
	super(props);
	this.state = {feedback:'',emails:[], send_to:'',to_name:'', name: 'D.P.M', email: 'DPM@gmail.com' };
	this.handleSubmit = this.handleSubmit.bind(this);
  }
  getEmails(){
	axios.defaults.withCredentials=true;
	axios.get('/api/getAllEmails',this.state.owner).then((res)=>{
	  this.setState({
		emails:res.data.emails
	  })
	})
  }
  componentDidMount(){
	this.getEmails();
}
  handleSubmit (event) {
	const templateId = 'template_rn864da';
	const d=this.state.emails;
	
	d.map((i)=>{
	this.sendFeedback(templateId, {send_to:i.email,message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email})
	})
}

  sendFeedback (templateId, variables) {
	window.emailjs.send(
  	'service_02w05dq', templateId,
  	variables
  	).then(res => {
    	console.log('Email successfully sent!')
  	})
  	// Handle errors here however you like, or use a React error boundary
  	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }
  render() {
	return (
  	<form className="test-mailing">
    	{/* <h1>Let's see if it works</h1> */}
    	<div>
      	{/* <textarea
        	id="test-mailing"
        	name="test-mailing"
        	onChange={this.handleChange}
        	placeholder="Post some lorem ipsum here"
        	required
        	value={this.state.feedback}
        	style={{width: '100%', height: '150px'}}
      	/> */}
    	</div>
    	<input type="button" value="Send Email notifications" className="btn btn--submit" onClick={this.handleSubmit} />
  	</form>
	)
  }
}
