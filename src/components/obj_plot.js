import React, { useEffect, useState } from 'react'
import TimeRange from './time_range'
import { makeStyles } from '@material-ui/core/styles';
//import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries} from 'react-vis';
import { XYPlot, XAxis, YAxis, VerticalGridLines,  HorizontalGridLines,  VerticalBarSeries, DiscreteColorLegend} from 'react-vis';
import SelectObj from './obj_select';

 const ObjectOfInterestPlot = (props) => {

  const timestamp = new Date().getTime(); // in mil. sec.
  const ONE_DAY = 3600000*24;
  const ONE_HOUR = 3600000;
      const DEFAULT_QUERY =  global.config.API + "moreparams?cam=" + props.cam +"&hour_back1=" +
            props.timerange.start + "&hour_back2="  + props.timerange.end + "&object_of_interest="
      const BASIC_COLOR = parseInt('0x008B8B', 16) //#12939A'
      const [data, setData]  = useState({})
      const [color, setColor] = useState(BASIC_COLOR)
      const [selected_obj_of_interest, setObjectOfInterest]  = useState([props.object_of_interest[0]])
      const useStyles = makeStyles({
        root: {
          paddingLeft: '20px',
        },
      });
      const classes = useStyles();
 
    async function fetchStatisticData(objectOfInterest) {
      
      fetch(DEFAULT_QUERY + objectOfInterest)
          .then(response => {
              // make sure to check for errors
              console.log(" response:" + response)
              if (response.ok) {
                  console.log(" response:" + JSON.stringify(response, null, 2) )
                  return response.json();
              } else {
                  console.log(" error:")
                  throw new Error('Something went wrong ...');
              }              
          })
          .then(val => { 
              data[objectOfInterest] = val
              data[objectOfInterest].color = color
              setColor(color + 100)
              setData(data) 
              return data;              
          });
         // .catch(error => this.setState({ error, isLoading: false }));
    }

    useEffect(() => { 
      setColor(BASIC_COLOR)
      selected_obj_of_interest.map(key => { if(key) fetchStatisticData(key) });
      },[props.cam, selected_obj_of_interest, props.timerange]);

    function onParamsChanged(timerange, object_of_interest ){
      setObjectOfInterest(object_of_interest);
      props.onParamsChanged(timerange, object_of_interest);
    }
    return (
    <div className={classes.root}>
      <TimeRange onParamsChanged={props.onParamsChanged} timerange={props.timerange}/>
      <SelectObj onParamsChanged={onParamsChanged} object_of_interest={props.object_of_interest}/>
     {/* <XYPlot
          xDomain={[timestamp - 2 * ONE_DAY, timestamp + 30 * ONE_DAY]}
          yDomain={[0.1, 11]}
          xType="time"
          width={300}
          height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalRectSeries data={DATA1} style={{stroke: '#fff'}} />
        <VerticalRectSeries data={DATA2} style={{stroke: '#ff54'}} />
      </XYPlot>
      xDomain={[timestamp - ONE_DAY , timestamp + ONE_HOUR]}
     */}
         <XYPlot xType="time" width={1500}  height={300}
           
         >
         <DiscreteColorLegend
            style={{position: 'absolute', left: '10px', top: '10px'}}
            orientation="horizontal"
            items={ Object.entries(data).map(([key, value]) =>  {return { title: key, color:data.color }} )}
          />

      <HorizontalGridLines />
      <VerticalGridLines />
      <XAxis title="time" />
      <YAxis title="Frequency" />
      <VerticalBarSeries key = {0} color = {data.color} data = {[ {x0: timestamp, x: timestamp + 60000, y: 5} ]} />
      {Object.entries(data).map(([key, value]) =>
        <VerticalBarSeries key = {key} color = {data.color} data = {value} />
      )}
     
    </XYPlot>
    </div>
    );
  }
  
export default ObjectOfInterestPlot