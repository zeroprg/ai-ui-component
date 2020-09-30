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

    
    const [data, setData]   = useState(null);
    const [start, setStart] = useState(props.start);
    const [end, setEnd]     = useState(props.end);

    async function fetchImageData(start, end, cam, object_of_interest) {
     const DEFAULT_QUERY =  "/moreimgs?start=" + start + "&cam=" + cam + "&end=" +end + "&object_of_interest=" + object_of_interest; 

      const response = await fetch(DEFAULT_QUERY);
      if ( response.ok ) {
        if( start  <  0  ) { setEnd( 0 ); setStart( img_paginator ); }
        else { 
            setStart(start + img_paginator);
            setStart(end + img_paginator);  
       }
      setData(await response.json());
      }
    }
    async function showmore(object_of_interest,  cam, start, end){
        //console.log("start:" + start);
        if( start  <  0  ) { setEnd( 0 ); setStart( img_paginator ); }
        else { 
            setStart(start + img_paginator); 
            setStart(end + img_paginator);
         }           
        
        const DEFAULT_QUERY =  "/moreimgs?start=" + start + "&cam=" + cam + "&end="+end + "&object_of_interest="+object_of_interest; 

        const response = await fetch(DEFAULT_QUERY);
        // store in state start and end 
        if ( response.ok ) {
             setEnd( end ); 
             setStart( start ); 
        } 
        setData(await response.json());

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
      <nav>
        <ul className="pagination header">
            <li><a id = {'first'+ props.cam } rel="first" href={showmore(props.object_of_interest,props.cam, 0, img_paginator)}>First</a></li>
            <li><a id = {'next'+  props.cam }  rel="next"  href={showmore(props.object_of_interest,props.cam, end, end + img_paginator )}>Next</a></li>
            <li><a id = {'prev'+  props.cam }  rel="prev"  href={showmore(props.object_of_interest,props.cam, start - img_paginator, start )}>Previous</a></li>
        </ul>
        </nav>       
    
        <div id={'Objectsfilter'+ props.cam } className="tabcontent" style={{display:'block'}}>
          <div id={'cam'+ props.cam} className="images_row">
           {data.map((data,indx) =>
            <img key={indx} className={'img_thumb'} src={data.frame}  alt={data.currentime} onClick={popup_image.bind(this)} />
           )} 
        </div> 
        </div>                        
       </span>
    );
  }
export default ObjectOfInterest