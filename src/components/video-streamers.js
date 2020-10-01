import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import SelectObj from './obj_select';

import ObjectOfInterestPlot from './obj_plot'
import ObjectOfInterest from './objects_of_interest'
import Video from './video';
import VideoStreamer from './video-streamer';

class VideoStreamers extends Component {
    // shared between childs functions
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


    loadURLs() {
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
                <Video camera = {url}/>
            </div> 
            )}
        </div>
        )

    } else {    
    return (            
       
        <span>
            {urls.map( camera =>               
            <VideoStreamer key={camera.url} camera={camera} object_of_interest={this.object_of_interest}/>
        )}
        </span>
    );
    }
  }
}
export default VideoStreamers     
