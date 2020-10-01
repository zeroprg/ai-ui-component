import React, { useState, useEffect } from 'react';

const ObjectOfInterest = (props) => {
    const img_paginator = 50;
    const popup_image = (event) =>{
        if(event.target.classList.contains('img_thumb')){
            event.target.classList.removeClass('img_thumb');
            event.target.classList.addClass('popup');
        } else if(event.target.classList.contains('popup')){
            event.target.classList.removeClass('popup');
            event.target.classList.addClass('img_thumb');
        }
    }

    
    const [data, setData]   = useState(props.data);
    const [start, setStart] = useState(props.start);
    const [end, setEnd]     = useState(props.end);

    async function fetchImageData(start, end, cam, object_of_interest) {
     const DEFAULT_QUERY =  "/moreimgs?start=" + start + "&cam=" + cam + "&end=" +end + "&object_of_interest=" + object_of_interest; 

        fetch(DEFAULT_QUERY)
            .then(response => {
                // make sure to check for errors
                if( start  <  0  ) { 
                     setEnd( 0 ); 
                     setStart( img_paginator ); }
                else {
                    setStart(start + img_paginator);
                    setStart(end + img_paginator);  
                }     
                return response.json();
            })
            .then(json => { 
                setData(json)
             });
    }


    useEffect(() => { 
        fetchImageData(props.start, props.end, props.cam, props.object_of_interest);
        },
        [props.start, props.end, props.cam, props.object_of_interest]);
        
    if (!data) {
        return "loading...";
    }
    
    return (
      <span>      
     {/*       
      <nav>
        <ul className="pagination header">
            <li><a id = {'first'+ props.cam } rel="first"  onClick={showmore(props.object_of_interest,props.cam, 0, img_paginator)}>First</a></li>
            <li><a id = {'next'+  props.cam }  rel="next"  onClick={showmore(props.object_of_interest,props.cam, end, end + img_paginator )}>Next</a></li>
            <li><a id = {'prev'+  props.cam }  rel="prev"  onClick={showmore(props.object_of_interest,props.cam, start - img_paginator, start )}>Previous</a></li>
        </ul>
      </nav>
     */}

        <div id={'Objectsfilter'+ props.cam } className="tabcontent" style={{display:'block'}}>
          <div id={'cam'+ props.cam} className="images_row">
           {data.map(data =>
            <img key={data.hashcode} id={data.hashcode} className={'img_thumb'} src={data.frame}  alt={data.currentime} onClick={popup_image.bind(this)} />
           )} 
        </div> 
        </div>                        
       </span>
    );
  }
export default ObjectOfInterest