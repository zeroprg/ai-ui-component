import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import SelectObj from './obj_select';

import ObjectOfInterestPlot from './obj_plot'
import ObjectOfInterest from './objects_of_interest'
import Video from './video';

class VideoStreamers extends Component {
    
    updateparams = (param) => {
        this.setState({param:param});
    }

    constructor(props) {
        super();
        this.state = {value: ''};        
        this.url = props.url;
      }


    componentWillMount() {
        // initial state
    this.setState({
        urls:[{cam:0,url:'http://203.77.210.41:2000/mjpg/video.mjpg'}, {cam:1,url:'http://203.77.210.41:2000/mjpg/video.mjpg'},{cam:2,url:'http://203.77.210.41:2000/mjpg/video.mjpg'}, {cam:3,url:'http://203.77.210.41:2000/mjpg/video.mjpg'}],
        objectOfInterests: ['car','person','cat', 'dog', 'track', 'motobike'],
        isLoading : false 
    })
}


    loadData() {
        const API = ""
        const DEFAULT_QUERY ="urls?list=true"
        this.setState({ isLoading: true });

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
            .then(data => this.setState({ urls: data.urls, objectOfInterests: data.objectOfInterests, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

render() {
    const { urls,  isLoading, error } = this.state;
    const { param } = this.props;
    const isOnlyVideos = param.videoalignment === 'video';



    if (error) {
        return <p>{error.message}</p>;
    }

    if (isLoading) {
        return <p>Loading ...</p>;
    }
    if (isOnlyVideos){
    return (
        <div className="row">
            {urls.map( url => 
            <div key={'cam'+url.cam} className="col-sm-4">
                <Video  url = {url}/>
            </div> 
            )}
        </div>
        )

    } else {    
    return (            
       
        <span>
            {urls.map( url =>               
            <section  key={'section'+url.cam} style={{display: 'block'}}>
                <div className="row">
                    <div className="col-sm-12">
                    <ObjectOfInterestPlot  cam={url.cam}/>
                    </div> 
                </div> {/* className row */}

            <div className="row">
              <div className="col-sm-6">
                <Video url = {url}/> 
              </div>  
              <div className="col-sm-6">                           
                <Tabs  defaultActiveKey="founded_objects" id="uncontrolled-tab">
                    <Tab eventKey="founded_objects" title="Founded Objects" className="tabcontent">
                        
                     <ObjectOfInterest object_of_interest='person' cam= {url.cam} />
  
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
        )}
        </span>
    );
    }
  }
}
export default VideoStreamers     
