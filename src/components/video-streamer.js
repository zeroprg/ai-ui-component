import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import SelectObj from './obj_select';

import ObjectOfInterestPlot from './obj_plot'
import ObjectOfInterest from './objects_of_interest'
import Video from './video';

class VideoStreamer extends Component {

    componentWillMount() {
        // initial state
    this.setState({
        data:[],
        objectOfInterests: ['car','person','cat', 'dog', 'track', 'motobike'],
        isLoading : false 
        })
    }
    // shared between childs functions
    showmore = (object_of_interest,  cam, start, end) => {
        //console.log("start:" + start);
        const  img_paginator = 50;
        if( start  <  0  ) { this.setState({end: 0 }); this.setState({ start: img_paginator }); }
        else { 
            const _start = start + img_paginator;
            this.setState({start: _start}); 
            const _end = end + img_paginator;
            this.setState({end: _end});
         }           
        
        const DEFAULT_QUERY =  "/moreimgs?start=" + start + "&cam=" + cam + "&end="+end + "&object_of_interest="+object_of_interest; 

        fetch(DEFAULT_QUERY)
            .then(response => {
                // make sure to check for errors
                return response.json();
            })
            .then(json => { 
                this.setState({data: json});
            });
    }

    render() {
        //const { error } = this.state;
        const { camera, object_of_interest } = this.props;
/*
        if (error) {
            return <p>{error.message}</p>;
        }
*/
        
        return (            
                <section  key={'section'+camera.cam} style={{display: 'block'}}>
                    <div className="row">
                        <div className="col-sm-12">
                           <ObjectOfInterestPlot  cam={camera.cam}/>
                        </div> 
                    </div> {/* className row */}

                <div className="row">
                <div className="col-sm-6">
                    <Video camera = {camera}/> 
                </div>  
                <div className="col-sm-6">                           
                    <Tabs  defaultActiveKey="founded_objects" id="uncontrolled-tab">
                        <Tab eventKey="founded_objects" title="Founded Objects" className="tabcontent">
                            
                            <ObjectOfInterest object_of_interest={object_of_interest} data={this.state.data} cam={camera.cam} />
    
                        </Tab>
    {/*                 <Tab eventKey="events" title="Events Notify" className="tabcontent">
                        <h3>Events notifyer</h3>
                            <p>Specify Events which will triger eMail or SMS/Voice notify.</p>
                            <select name="objects">
                                <option value="person">person</option>
                                <option value="car">car</option>
                                <option value="dog">dog</option>
                                <option value="cat">cat</option>
                            </select> and 
                            <select name="quantity">
                                <option value="quantity">quantity</option>
                                <option value="time">time(sec.)</option>
                            </select> 
                            <select name="&gt;>">
                                <option value={'&gt;'}>&gt;</option>
                                <option value={'&lt;'}>&lt;</option>
                                <option value="=">=</option>
                            </select>              
                            <input type="number" id="quantity" name="quantity" placeholder="0" min="0" max="100" />
                            <br/>
                            Notify me by 
                            <select name="eMail;>">
                                <option value="email;">email</option>
                                <option value="sms">SMS</option>
                                <option value="voice">voice</option>
                            </select> 
                            :
                            <input type="text" placeholder="" min="0"  max="100" />
                        </Tab> 
                */}       
                    </Tabs>
                    </div>  {/*<div className="col-sm-6">*/}
                </div> {/* className row */}
            </section>                       
            );
        }
}
export default VideoStreamer