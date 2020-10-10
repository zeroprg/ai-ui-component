import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines,  HorizontalGridLines,  VerticalBarSeries, DiscreteColorLegend} from 'react-vis';

class Ploter extends Component {

    render() {
        const time = new Date().getTime(); // in mil. sec.
        //const ONE_DAY = 3600000*24;
        const ONE_HOUR = 3600000;
        return (

            <XYPlot xType="time" width={1500}  height={300}
                    xDomain={[ time - this.props.timerange.start*ONE_HOUR/2, time +  30000 ]}
            >
                <DiscreteColorLegend
                    style={{position: 'absolute', left: '10px', top: '10px'}}
                    orientation="horizontal"
                    items={ Object.entries(this.props.data).map(([key, value]) =>   key )}
                />

            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis title="time" />
            <YAxis title="Frequency" />
            
            {Object.entries(this.props.data).map(([key, value]) =>
                <VerticalBarSeries key = {key}  data = {value} />
            )}     
            </XYPlot>
        
            );
        }  
}
export default Ploter;