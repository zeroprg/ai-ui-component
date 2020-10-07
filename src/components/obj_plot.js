import React from 'react'
import TimeRange from './time_range'
import { makeStyles } from '@material-ui/core/styles';
//import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries} from 'react-vis';
import { XYPlot, XAxis, YAxis, VerticalGridLines,  HorizontalGridLines,  VerticalBarSeries, DiscreteColorLegend} from 'react-vis';
import SelectObj from './obj_select';

 const ObjectOfInterestPlot = (props) => {
  const useStyles = makeStyles({
    root: {
      paddingLeft: '20px',
    },
  });
const classes = useStyles();





    return (
    <div className={classes.root}>
      <TimeRange onParamsChanged={props.onParamsChanged} timerange={props.timerange}/>
      <SelectObj onParamsChanged={props.onParamsChanged} object_of_interest={props.object_of_interest}/>
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
     */}
         <XYPlot xType="linear" width={500} style = {{'min-width': '300px'}} height={400}>
         <DiscreteColorLegend
            style={{position: 'absolute', left: '10px', top: '10px'}}
            orientation="horizontal"
            items={[
              {
                title: 'Apples',
                color: '#12939A'
              },
              {
                title: 'Oranges',
                color: '#79C7E3'
              }
            ]}
          />

      <HorizontalGridLines />
      <VerticalGridLines />
      <XAxis title="X Axis" />
      <YAxis title="Y Axis" />
      <VerticalBarSeries color='#12939A'
        data={[{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}, {x: 5, y: 3}, {x: 6, y: 5}, {x: 7, y: 15}, {x: 8, y: 12}, {x: 9, y: 3}, {x: 10, y: 5}, {x: 12, y: 15}, {x: 13, y: 12}]}
      />
      <VerticalBarSeries data={null} />
      <VerticalBarSeries color='#79C7E3'
        data={[{x: 1, y: 10}, {x: 2, y: 4}, {x: 4, y: 2}, {x: 5, y: 15}]}
      />
    </XYPlot>
    </div>
    );
  }
  
export default ObjectOfInterestPlot