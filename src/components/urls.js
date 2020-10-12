import React, { Component } from 'react';

class URLlist extends Component {

buttonClickHide(arg1, arg2) {
    let elem = document.getElementById("section"+arg2)
    if(elem) elem.style.display ='none';
}
 constructor(){
     super();
     this.state = {data : []};
 }

 updateparams(param) {
    this.props.updateparams(param);
  }

 updateurls( data ) {
    this.setState( data )    
    this.props.updateurls(data);
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

buttonClickShow(cam) {
    this.updateparams({ videoalignment: 'both' });
    let elem = document.getElementById("section"+cam);
    
    if (elem ) {
        elem.scrollIntoView();
    }    

}

loadData() {  
    const DEFAULT_QUERY = global.config.API + "urls?list=true"
    const URL = global.config.API + "urls"
    const deleteURL = URL + "?delete="
    this.setState({ isLoading: true });
   
    fetch(DEFAULT_QUERY)
        .then(response => {
            console.log(" response:" + response)
            if (response.ok) {
                //console.log(" response:" + JSON.stringify(response, null, 2) )
                this.setState({isLoading: false })
                return response.json();
            } else {
                console.log(" error:")
                throw new Error('Something went wrong ...');
            }
        })
        .then(data => {
             this.setState({ data: data, isLoading: false })
             this.updateurls(data);
             return data;
            })
        .catch(error => this.setState({ error, isLoading: false }));
}

/*
componentWillMount() {
        // initial state
    this.setState({
        data : [[0, "http://213.226.254.135:91/mjpg/video.mjpg"]],
        isLoading : false,
       // error: {message: 'URL is empty' }
    })
}    


                    <a  onClick={() =>  this.buttonClickHide(this.state.url+data[1] , data[0])} className="btn btn-primary a-btn - slide - text">
                        <span className="glyphicon" aria-hidden="true"></span>
                        <span>
                            <strong>Hide</strong>
                        </span>
                    </a>

*/
componentDidMount() {
    // initial state
    this.loadData()
}    

componentWillReceiveProps(nextProps) {
    if(nextProps.url && nextProps.url !== this.state.url && !nextProps.url.includes("Wrong URL")) {
        this.loadData()
    }
}    


render() {
    const { data } = this.state;

    if(data && data.length>0)    
    return (
        <ul>
            {data.map(data =>
                <li key={data[0]}>
                    <a href={data[1]}>{data[1]}</a>
                    &nbsp;
                    <a onClick={() => this.buttonClickShow( data[0] )} className="btn btn-primary a-btn - slide - text">
                        <span className="glyphicon" aria-hidden="true"></span>
                        <span>
                            <strong>Show</strong>
                        </span>
                    </a>
                </li>
            )}
        </ul>
    );
    else {
        return <p className= "loading"> ...  Loading ...</p>
    }
  }
}
export default URLlist