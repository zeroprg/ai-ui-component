import React from 'react'
import TimeRange from './time_range'

 const ObjectOfInterestPlot = (props) => {

    return (
      <div>
        <TimeRange/>
        <div id= {'lastDiv' +props.cam} className="col-sm-12" style={{height:'290px', width:'100%'}}> 	</div>

      </div>
    );
  }
  
export default ObjectOfInterestPlot