import React, { Component } from 'react';
import { FormControl,RadioGroup,FormControlLabel, Radio } from '@material-ui/core';

class InputURL extends Component {
    state = {isLoading: false , videoalignment: 'video'};
    constructor(props) {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      updateparams(param) {
        this.props.updateparams(param);
      }
    
      handleInputChange(event) {
        const target = event.target;
        
        const value = target.type === 'checkbox'  ? target.checked : target.value;
        const name = target.name;
        
        this.setState({ [name]: value });
        this.updateparams({ [name]: value });
      }

      handleSubmit(event) {
        alert('A form was submitted: ' + this.state.value);                
        this.setState({ isLoading: true });
        event.preventDefault();
      }
    
      saveURLForm() {          
        const API = ""
        const DEFAULT_QUERY ="urls?submit=true"
        console.log(" start:")
        fetch(API + DEFAULT_QUERY)
            .then(response => {
                console.log(" response:" + response)
                if (response.ok) {
                    //console.log(" response:" + JSON.stringify(response, null, 2) )
                    return response.json();
                } else {
                    console.log(" error:")
                    throw new Error('Something went wrong ...');
                }
            })
            .then(this.props.addURL(this.state.url))
            .catch(error => this.setState({ error, isLoading: false }));
        } 

    render() {
        const { isLoading, error } = this.state;
    
        if (error) {
            return <p>{error.message}</p>;
        }
    
        if (isLoading) {
            return <p>Loading ...</p>;
        }
    
        return (
            <div>
                <h3>Enter IP Camera url at this box </h3>
                <h3><b>Warning:</b> "By specifying IP Address or camera URL bellow you will share your link with all other subscribers. To make this link private your have to subscribe to payable version"</h3>
                    <form id="myform" className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="pwd">URL:</label>
                                <div className="col-sm-10">
                                    <input type="URL" className="form-control" id="url" name="url" placeholder="Enter Camera ip or URL address here"
                                           value={this.state.url} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" id="email" placeholder="someone@example.com" name="email"
                                            value={this.state.email} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <input type="submit" value="submit" className="btn btn-default"/>
                                </div>
                            </div>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="videoalignment" name="videoalignment" value={this.state.videoalignment} onChange={this.handleInputChange}>
                                    <FormControlLabel value="video" control={<Radio />} label="Show only video" />
                                    <FormControlLabel value="both" control={<Radio />} label="Show captured objects and video" />
                                    <FormControlLabel disabled value="objects" control={<Radio />} label="Show captured objects only" />
                                </RadioGroup>
                           </FormControl>
    
                    </form>
                </div>
                    )
        };
}

export default InputURL