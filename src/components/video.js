import React ,{useState, createRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';




const Video = (props) => {
    const HOST = global.config.API
    const [showBoxes, setShowBoxes] = useState(false) ;
    const checkBoxInput = createRef();
    const useStyles = makeStyles({
        root: {
            '-webkit-user-select': 'none',
             display: 'block',
             width: '100%',
             'min-width': '700px',
             height: 'auto',             
             'padding-bottom': '20px',
        },
      });
      const classes = useStyles(); 
      const{camera} = props;        

// <b> {camera.url}: <button id={'drwZone'+ camera.cam} onClick = {this.showframes? 'refresh(' + camera.cam +')'}>Show zones</button>             <b> {camera.url}: <button id={'drwZone'+ camera.cam} onClick = {this.showframes? 'refresh(' + camera.cam +')'}>Show zones</button></b>         <br/> 

    const changeCheckBoxInput = () => {
            setShowBoxes(!showBoxes);
        }

    return(<span>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="defaultChecked2" 
                       ref={checkBoxInput} 
                       onChange={changeCheckBoxInput} 
                       {...showBoxes?'checked':''}/>
                <label class="custom-control-label" for="defaultChecked2">Show catched objects on screen</label>
            </div>
            <img id={'stream'+camera.cam}  className={classes.root} src={showBoxes? HOST+"video_feed?cam="+camera.cam : camera.url } alt="Video Streamer"/>
            <div id={'canvas_div'+ camera.cam} style={{float:'left', marginLeft: '20px', display:'none'}} >
                    <canvas id={'jPolygon'+ camera.cam} width="500" height="400" style={{cursor: 'crosshair'}} data-imgsrc={camera.url} onMouseDown="point_it(event,{{cam}})" onContextMenu="return false;">
                        Your browser does not support the HTML5 canvas tag.
                    </canvas>
                    <br/><br/>
                    <div>
                        <button onClick = {'undo(' + camera.cam +')'} >Undo</button>
                        <button onClick={'clear_canvas(  ' + camera.cam + ')'}>Clear</button>
                        <button onClick={'point_it(event, ' +camera.cam + ')'}>Close Polygon</button>
                        <p>Press <strong>Left Click</strong> to draw a point.</p>
                        <p><strong>CTRL+Click</strong> or <strong>Right Click</strong> to close the polygon.</p>
                    </div>
                    <div>
                        <p><strong>Coordinates:</strong></p>
                        <textarea id={'coordinates'+ camera.cam} disabled="disabled" style={{width: '400px', height: '100px'}}></textarea>
                        <br/>
                        <button align="center">Save</button>
                    </div>
            </div>
         </span>
  );
}
export default Video