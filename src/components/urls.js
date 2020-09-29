import React, { Component } from 'react';


function addURL(url){
    this.setState(url);
  }

class URLlist extends Component {

buttonClickHide(arg1, arg2) {
    document.getElementById("section"+arg2).style.display ='none';
}

/*
moreparams(camera , value){
    hours = value.split("-");
    hour_back2 = hours[0];
    hour_back1 = hours[1];
    //this function uses ajax to interact with the server
     // r.multipart = true;
          var timestamp = new Date() / 1000 | 0
          r_h.open('GET', "{{ url_for('moreparams') }}?cam="+camera+"&hour_back1="+ hour_back1 + "&hour_back2="+hour_back2, true);
          r_h.send();
          r_h.onprogress = function(){
              populate_lastparams(camera, value); 
              };
 }  
*/

buttonClickShow(data, cam) {
    console.log("cam:" + cam); 
    console.log("data:" + data);
    let elem = document.getElementById("section"+cam);
    elem.style.display ='block'
    this.moreparams(cam, "0-1");
    //this.showmore(1,cam,0);
    elem.scrollIntoView();

/*
    fetch(data)
         .then(response => {
            console.log(" response:" + response)
            if (response.ok) {
                console.log(" response:" + JSON.stringify(response, null, 2) ); 
                this.loadData();
                return response.json();
            } else {
                console.log(" error:")
                throw new Error('Something went wrong ...');
            }
        })
*/
}

loadData() {
    const API = ""
    const DEFAULT_QUERY ="urls?list=true"
    const URL = API + "urls"
    const deleteURL = URL + "?delete="
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
        .then(data => this.setState({ data: data, url: deleteURL, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
}


componentWillMount() {
        // initial state
    this.setState({
        data : [[0, "http://213.226.254.135:91/mjpg/video.mjpg"]],
        isLoading : false,
       // error: {message: 'URL is empty' }
    })
}    

componentDidMount() {
    // initial state
    //this.loadData()
}    


render() {
    const { data, isLoading, error } = this.state;

    if (error) {
        return <p>{error.message}</p>;
    }

    if (isLoading) {
        return <p>Loading ...</p>;
    }

    return (
        <ul>
            {data.map(data =>
                <li key={data[0]}>
                    <a href={data[1]}>{data[1]}</a>
                    &nbsp;
                    <a onClick={() => this.buttonClickShow(this.state.url+data[1] , data[0])} className="btn btn-primary a-btn - slide - text">
                        <span className="glyphicon" aria-hidden="true"></span>
                        <span>
                            <strong>Show</strong>
                        </span>
                    </a>
                    <a  onClick={() =>  this.buttonClickHide(this.state.url+data[1] , data[0])} className="btn btn-primary a-btn - slide - text">
                        <span className="glyphicon" aria-hidden="true"></span>
                        <span>
                            <strong>Hide</strong>
                        </span>
                    </a>
                </li>
            )}
        </ul>
    );
  }
}
export default URLlist