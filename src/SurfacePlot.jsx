import React from 'react';
import { MAP_X, MAP_Y, data } from './testData';
import { fillMap } from './utils';
import Plotly from 'plotly.js-dist'
import styles from './css/SurfacePlot.module.css';

class SurfacePlot extends React.Component {
    constructor(props){
        super(props);
        this.data = [{
            z: props.data,
            type: props.graphType,
            connectgaps: true
        }];
        this.layout = {
            title: 'Test',
            autosize: false,
            width: 800,
            height: 800,
            margin: {
              l: 100,
              r: 50,
              b: 50,
              t: 50,
            }
        };
    }

    componentDidMount() {
        Plotly.newPlot('graph', this.data, this.layout);
    }

    componentWillReceiveProps(newProps) {
        console.log("Hello");
        Plotly.newPlot('graph', [{
            z: newProps.data,
            type: newProps.graphType,
            connectgaps: true
        }], this.layout);
    }

    render() {   
        return (
            <div>
                <div id="graph" className={styles.graph}></div>
            </div>
        );
    }
}

export default SurfacePlot;