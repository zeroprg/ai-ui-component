import React, { useEffect, useState } from 'react'
import TimeRange from './time_range'
import { makeStyles } from '@material-ui/core/styles';
//import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries} from 'react-vis';
import SelectObj from './obj_select';
import Ploter from './ploter';

 const ObjectOfInterestPlot = (props) => {

      const DEFAULT_QUERY =  global.config.API + "moreparams?cam=" + props.cam +"&hour_back1=" +
            props.timerange.start + "&hour_back2="  + props.timerange.end + "&object_of_interest="
      const BASIC_COLOR = parseInt('0x008B8B', 16) //#12939A'
   
      const [timerange, setTimerange] = useState(props.timerange);
      const [data, setData]  = useState({})
      const [color, setColor] = useState(BASIC_COLOR)
      const [selected_obj_of_interest, setObjectOfInterest]  = useState([props.object_of_interest[0]])
      const [time, setTime] = useState( new Date().getTime());
   
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
    function fetchAll(){
      selected_obj_of_interest.map(key => { if(key) fetchStatisticData(key) });
    }



    useEffect(() => {
      const interval = setInterval(() => setTime(new Date().getTime()), 1000);
      return () => {
        clearInterval(interval);
      };
    }, []);

    useEffect(() => { 
      setColor(BASIC_COLOR)   
      fetchAll();
      },[props.cam, selected_obj_of_interest, timerange, data, time]);


      

    function onParamsChanged(timerange, object_of_interest ){
      setObjectOfInterest(object_of_interest);
      if(timerange !== undefined) setTimerange(timerange);
      props.onParamsChanged(timerange, object_of_interest);
    }
    return (
    <div className={classes.root}>
      <TimeRange onParamsChanged={props.onParamsChanged} timerange={props.timerange}/>
      <SelectObj onParamsChanged={onParamsChanged} object_of_interest={props.object_of_interest} selected_object_of_interest={[props.object_of_interest[0]]}/>
      <Ploter data={data} timerange = {timerange} />
    </div>
    );
  }
  
export default ObjectOfInterestPlot