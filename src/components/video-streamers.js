import React, { Component } from 'react';

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
        this.object_of_interest = ['car','person','cat', 'dog', 'track', 'motobike'];

            // initial state
        this.setState({
            isLoading : false,
            //object_of_interest: ['car','person','cat', 'dog', 'track', 'motobike']

        })
        this.timerange = {start: 0, end: 46456};
    }

    componentDidMount() {
        // initial state
       // this.loadURLs()
    }    

    loadURLs() {
        const DEFAULT_QUERY =  global.config.API + "urls?list=true";
        this.setState({ isLoading: true });

        fetch( DEFAULT_QUERY )
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
            .then(data => this.setState({ urls: data.urls, object_of_interest: data.object_of_interest, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

render() {
    const { urls } = this.props;
    const {  isLoading, error } = this.state;
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
                <Video camera = {url} />
            </div> 
            )}
        </div>
        )

    } else {    
    return (            
       
        <span>
            {urls.map( camera =>               
            <VideoStreamer key={camera.url} camera={camera} timerange = {this.timerange}  object_of_interest={this.object_of_interest}/>
        )}
        </span>
    );
    }
  }
}
export default VideoStreamers     
