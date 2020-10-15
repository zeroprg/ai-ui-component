import { map } from 'd3';
import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines,  HorizontalGridLines,  VerticalBarSeries, DiscreteColorLegend, VerticalRectSeries} from 'react-vis';

class Plotter extends Component {

    render() {
        const time =  Math.floor(new Date().getTime());; // in mil. sec.
        //const ONE_DAY = 3600000*24;
        //{Object.entries(this.props.data).map(([key, value]) =>
        //  xDomain={[ time - this.props.timerange.end*ONE_HOUR, time - this.props.timerange.start*ONE_HOUR ]}

        const ONE_HOUR = 3600000;
        if( this.props && Object.keys(this.props.data).length > 0 && this.props.data.values.length>0)
        return (

            <XYPlot xType="time" width={1500}  height={300}
                xDomain={[ time - this.props.timerange.end*ONE_HOUR, time - this.props.timerange.start*ONE_HOUR ]}
            >
                <DiscreteColorLegend
                    style={{position: 'absolute', left: '10px', top: '10px'}}
                    orientation="horizontal"
                    items=  {map.data(data => data.label)}
                />

            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis title="time" />
            <YAxis title="Frequency" />
            
            { map.data( data =>
                <VerticalRectSeries key = {this.props.data.label}  data = {this.props.data.values} />
            )}
            </XYPlot>
        
            );
         else 
            return (
                <div className="loading"> ... Loading </div>
              );
        
        }  
}
export default Plotter;