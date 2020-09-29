import React, { Component } from 'react';


import URLlist from './components/urls'
import InputURL from './components/input-forms'
import VideoStreamers from './components/video-streamers'
//import Carousel from 'react-bootstrap/Carousel'

class App extends Component {
  state = { url: {cam:0, url:''}, param: {videoalignment: 'video'} }

  addNewURL(url){
    this.setState({url:url});
  }

  updateparams = (param) => {
      this.setState({param:param});
  }

  render() {
    return (  
    <div className="App">
      <header className="App-header">
        <section className="hero">
            <div className="texture-overlay"></div>
            <div className="container">
               {/* <div class="row nav-wrapper"/> */}

                <div className="hero-content">
                    <div className="col-md-12">
                        {/*<a href=""></a> */}
                    </div>
                    <div className="col-md-12">
                        <h1 className="animated fadeInDown">AI processed video streams from public cameras.</h1>
                        <h3> This is free smart cloud storage  for cameras video streams works on ODROID ARM based computers   (100% python , no php  for more information check 
                        <a href="//aicameras.ca" target="_blank" rel="noopener noreferrer"> http://aicameras.ca</a> ), bellow public available video-streams: </h3>
                        <URLlist key={this.state.url}/>
                        <InputURL updateparams={this.updateparams.bind(this)} addURL={this.addNewURL.bind(this)}/>          
                     </div>
                </div>
            </div>
        </section>
    </header>
    <section id="videos">
     <div className="row">
       <VideoStreamers param={this.state.param}  addURL={this.addNewURL.bind(this,this.state.url)} />
    </div> 
    </section>
 
        <div class="feature-bg">
            <div class="row">
                <div class="col-md-12 nopadding">
                    <div class="features-slider">
                        <ul class="slides" id="featuresSlider">
                            <li>
                                <h1>Counting objects</h1>
                                <p>
                                    Appling existing  <a href="https://www.pyimagesearch.com/2020/01/27/yolo-and-tiny-yolo-object-detection-on-the-raspberry-pi-and-movidius-ncs/">YOLO Tiny V3</a>
                                    Model network to surveillance cameras live video streams <a href="http://aicams.ca" class="arrow-btn">aicams.ca</a> to
                                    calculate occupancy number on video screen
                                </p>
                            </li>
                            <li>
                                <h1>Store Objects of interest:</h1>
                                <p>
                                    Any object of interest can be saved
                                    Trial version has only 1Gb storage to store statistic data, images and video
                                </p>
                            </li>
                            <li>
                                <h1>Check Objects behaviour :</h1>
                                <p>
                                Check if object of interest behave accordingly. 
                    Check if object of interest was found  notify immediatly by eMail, SMS or voice call
                    You can buy full source code version of our cloud solution plus hardware (ARM computer) from our store : <a href="//aicameras.ca" target="_blank">http://aicameras.ca</a>.                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

                    
    </div>
  );}
}
export default App;