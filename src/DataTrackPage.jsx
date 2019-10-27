import React from 'react';
import classes from './css/dataTrackPage.module.css';
import Plot from 'react-plotly.js';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TimelineIcon from '@material-ui/icons/Timeline';
import Button from '@material-ui/core/Button';
import { deviceIDs, datatypes } from './const.js';

const randomColor = () => {
    return `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()})`;
}

const colors = Array(50).fill(null).map(_ => randomColor());

const styles = {
    title: {
        fontFamily: 'Quicksand',
        fontSize: "40px",
        paddingTop: "50px",
        marginBottom: "25px",
        textAlign: 'center',
    },
    select: {
        fontFamily: "Quicksand"
    },
    selectBox: {
        fontFamily: "Quicksand",
        width: "29%",
        marginLeft: "2%",
        marginRight: "2%"
    },
    button: {
        width: "20%",
        margin: "0 auto",
        marginTop: "20px"
    }
}

class DataTrackPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            deviceID: deviceIDs[0],
            dataType: [datatypes[0]],
            pastN: 10,
            data: {[datatypes[0]]: Array(10).fill(0)},
            plotType: "scatter",
            idx: 0,
            watch: false,
        }
    }
    
    toggleWatch = () => {
        if(this.state.watch === false){
            var intervalId = setInterval(this.track, 1000);
            this.setState({intervalId: intervalId, watch: true});
        }
        else{
            clearInterval(this.state.intervalId);
            this.setState({watch: false});
        }
    }

    track = () => {
        this.setState({
            idx: this.state.idx + 1
        })
    }

    componentWillUnmount = () => {
        clearInterval(this.state.intervalId);
    }
    

    handleChange = event => {
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value,
        });
        
    }

    onSubmit = () => {
        let payload = {
            'id': this.state.deviceID,
            'type': this.state.dataType,
            'n': 100,
        };
        console.log(payload);
        fetch(
            "/ndata",
            {
                method: "POST",
                body: JSON.stringify(payload)
            }
        ).then(
            res => {
                console.log(res.status);
                return ((res.status !== 200) ? Promise.reject("fail") : res.json());
            }
        ).then(
            data => {
                console.log(data);
                console.log('types', this.state.dataType);
                let seq = {};
                for(let type of this.state.dataType) seq[type] = [];
                for(let obj of data)
                    for(let type of this.state.dataType)
                        seq[type].push(obj[type]);
                console.log('seq', seq);
                this.setState({data: seq});
            }
        ).catch(err => {
            console.log(err);
        });
        
        return;
    }

    render() {
        return (
            <div className={classes.page}>
                <div className="animated flash delay-2s" style={styles.title}>
                    Real-time Data Tracking <TimelineIcon style={{fontSize: "50px"}}/>
                </div>
                <Plot 
                    data={
                        Object.keys(this.state.data).map((type, idx) => ({
                            y: this.state.data[type].slice(this.state.idx, this.state.idx + this.state.pastN),
                            x: Array(this.state.pastN).fill(0).map((_, idx) => idx + 1),
                            type: this.state.plotType,
                            name: type,
                            line: {
                                color: colors[idx]
                            }
                        }))
                    }
                    layout={
                        {
                            width: 1500,
                            height: 300
                        }
                    }
                />
                <div className={classes.selectContainer}>
                    <FormControl style={styles.selectBox} variant="outlined">
                        <InputLabel htmlFor="outlined-device-simple">
                            Device ID
                        </InputLabel>
                        <Select
                            style={styles.select}
                            value={this.state.deviceID}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'deviceID',
                                id: 'outlined-device-simple',
                            }}
                        >
                            {
                                deviceIDs.map(id => {
                                return(
                                    <MenuItem style={styles.select} key={id} value={id}>{id}</MenuItem>)
                                })
                            }
                        </Select>
                    </FormControl>

                    <FormControl style={styles.selectBox} variant="outlined">
                        <InputLabel htmlFor="outlined-data-simple">
                            Measurements
                        </InputLabel>
                        <Select
                            style={styles.select}
                            multiple
                            value={this.state.dataType}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'dataType',
                                id: 'outlined-data-simple',
                            }}
                        >
                            <MenuItem style={styles.select} value={"temp"}>
                                Temperature
                            </MenuItem>
                            <MenuItem style={styles.select} value={"lum"}>
                                Luminance
                            </MenuItem>
                            <MenuItem style={styles.select} value={"co2"}>
                                Carbon Dioxide
                            </MenuItem>
                            <MenuItem style={styles.select} value={"so2"}>
                                Sulfur Dioxide
                            </MenuItem>
                            <MenuItem style={styles.select} value={"pa"}>
                                Atomspheric Pressure
                            </MenuItem>
                            <MenuItem style={styles.select} value={"wind"}>
                                Wind Speed
                            </MenuItem>
                            <MenuItem style={styles.select} value={"uv"}>
                                Ultraviolet
                            </MenuItem>
                            <MenuItem style={styles.select} value={"hum"}>
                                Humidity
                            </MenuItem>
                            <MenuItem style={styles.select} value={"rad"}>
                                Radiation
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={styles.selectBox} variant="outlined">
                        <InputLabel htmlFor="outlined-n-simple">
                            Past N Data
                        </InputLabel>
                        <Select
                            style={styles.select}
                            value={this.state.pastN}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'pastN',
                                id: 'outlined-n-simple',
                            }}
                        >
                            {
                                Array(10).fill(0).map((_, idx) => {
                                let N = 10 * (idx + 1);
                                return(
                                    <MenuItem style={styles.select} key={N} value={N}>{`Past ${N} data`}</MenuItem>)
                                })
                            }
                        </Select>
                    </FormControl>
                    <div style={styles.button}>
                        <Button 
                            onClick={this.onSubmit}
                            style={{width: "100%", backgroundColor: "rgb(242, 242, 242)", fontFamily: "Quicksand"}}>
                            Submit
                        </Button>
                    </div>
                    <div style={styles.button}>
                        <Button 
                            onClick={this.toggleWatch}
                            style={{width: "100%", color:"white", backgroundColor: "rgb(255, 77, 77)", fontFamily: "Quicksand"}}>
                            Track
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DataTrackPage;