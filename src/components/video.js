import React from 'react';
import { makeStyles } from '@material-ui/core/styles';



const Video = (props) => {
    const useStyles = makeStyles({
        root: {
            '-webkit-user-select': 'none',
             display: 'block',
             width: '100%',
             'min-width': '300px',
             height: 'auto',
        },
      });
      const classes = useStyles(); 
      const {url,cam} = props.url;        

    return(<span>              
            <b>{url}: <button id={'drwZone'+ cam} onClick = {'refresh(' +cam +')'}>Show zones</button>
            </b>
            <br/> 
            <img id={'stream'+cam}  className={classes.root} src={url} alt="Video Streamer"/>
            <div id={'canvas_div'+ cam} style={{float:'left', marginLeft: '20px', display:'none'}} >
                    <canvas id={'jPolygon'+ cam} width="500" height="400" style={{cursor: 'crosshair'}} data-imgsrc={url} onMouseDown="point_it(event,{{cam}})" onContextMenu="return false;">
                        Your browser does not support the HTML5 canvas tag.
                    </canvas>
                    <br/><br/>
                    <div>
                        <button onClick = {'undo(' + cam +')'} >Undo</button>
                        <button onClick={'clear_canvas(  ' + cam + ')'}>Clear</button>
                        <button onClick={'point_it(event, ' +cam + ')'}>Close Polygon</button>
                        <p>Press <strong>Left Click</strong> to draw a point.</p>
                        <p><strong>CTRL+Click</strong> or <strong>Right Click</strong> to close the polygon.</p>
                    </div>
                    <div>
                        <p><strong>Coordinates:</strong></p>
                        <textarea id={'coordinates'+cam} disabled="disabled" style={{width: '400px', height: '100px'}}></textarea>
                        <br/>
                        <button align="center">Save</button>
                    </div>
            </div>
         </span>
  );
}
export default Video