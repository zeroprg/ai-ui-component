import React, { Component } from 'react';

class ObjectOfInterest extends Component {
    
    state = {isLoading: false , imgClassName: 'img_thumb', start:0};

    popup_image = (event) =>{
        if(event.target.classList.contains('img_thumb')){
            event.target.classList.removeClass('img_thumb');
            event.target.classList.addClass('popup');
        } else if(event.target.classList.contains('popup')){
            event.target.classList.removeClass('popup');
            event.target.classList.addClass('img_thumb');
        }

    }


    showmore = (object_of_interest, direction, cam, _start)=>{
        const img_paginator = 50;

        //console.log("start:" + start);
        
        if (this.state.start + direction * img_paginator < 0) 
            direction = -direction;
    
        const start = this.state.start + direction * img_paginator;
        this.setState({start: start});
        const API = ""
        const DEFAULT_QUERY =  "/moreimgs?start=" + this.state.start + "&cam=" + cam + "&direction="+direction; 
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
        .then(data => this.setState({ data: data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render(){
        const { data, isLoading, error } = this.state;
        if (error) {
            return <p>{error.message}</p>;
        }
    
        if (isLoading) {
            return <p>Loading ...</p>;
        }
    return (
      <span>        
        <nav>
        <ul className="pagination header">
            <li><a id = "first{{cam}}" rel="first" href={this.showmore(this.props.object_of_interest,1,this.props.url.cam,0)}>First</a></li>
            <li><a id = "next{{cam}}"  rel="next"  href={this.showmore(this.props.object_of_interest,1,this.props.url.cam)}>Next</a></li>
            <li><a id = "prev{{cam}}"  rel="prev"  href={this.showmore(this.props.object_of_interest,1,this.props.url.cam)}>Previous</a></li>
        </ul>
        </nav>       
        <div id={'Objectsfilter'+ this.props.url.cam } className="tabcontent" style={{display:'block'}}>
           {data.map((data,indx) =>
            <img key={indx} className={this.state.imgClassName} src={data.frame}  alt={data.currentime} onClick={this.popup_image.bind(this)} />
           )} 
        </div>                         
       </span>
    );}
}
export default ObjectOfInterest;