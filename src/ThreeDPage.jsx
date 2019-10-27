import React from 'react';
import pageClass from './css/pages.module.css';
import threeDPageClass from './css/threeDpage.module.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SurfacePlot from './SurfacePlot.jsx';
import { List, ListItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { fillMap } from './utils.js';
import { deviceIDs, datatypes } from './const.js';

Object.assign(pageClass, threeDPageClass);

const styles = {
    select: {
        fontFamily: "Quicksand"
    },
    selectBox: {
        fontFamily: "Quicksand",
        width: "80%",
        marginTop: "5%",
        marginLeft: "10%",
    },
    list: {
        marginLeft: "10%",
        marginTop: '10%',
        maxHeight: '60%', 
        overflow: 'auto',
        width: "80%",
        backgroundColor: "rgb(247, 247, 247)",
        borderRadius: "10px",
    },
    listItm: {
        fontFamily: 'Quicksand',
    },
    button: {
        width: "20%",
        margin: "0 auto",
        marginTop: "20px"
    }
}

class ThreeDPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataType: 'temp',
            data: Array(30).fill(0),
            dataMap: Array(30).fill(0).map(itm => Array(30).fill(0)),
            graphType: 'surface',
        }
    }

    handleChange = event => {
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onSubmit = () => {
        let payload = {type: this.state.dataType};
        fetch(
            "/position",
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
                const map = fillMap(data, 100, 100);
                console.log(map);
                this.setState({data: data.map(obj => obj.value), dataMap: map});
            }
        ).catch(err => {
            console.log(err);
        });
        return;
    }

    render() {
        return (
            <div className={pageClass.page}>
                <div className={pageClass.container}>
                    <div className={pageClass.graphContainer}>
                        <SurfacePlot 
                            data={this.state.dataMap} 
                            graphType={this.state.graphType}
                        />
                    </div>
                    <div className={pageClass.selectContainer}>
                        <FormControl style={styles.selectBox} variant="outlined">
                            <InputLabel htmlFor="outlined-graph-simple">
                                Graph Type
                            </InputLabel>
                            <Select
                                style={styles.select}
                                value={this.state.graphType}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'graphType',
                                    id: 'outlined-graph-simple',
                                }}
                            >
                            <MenuItem style={styles.select}value={"heatmap"}>Heatmap</MenuItem>
                            <MenuItem style={styles.select}value={"surface"}>Surface Plot</MenuItem>
                            </Select>
                        </FormControl>
                                
                        <FormControl style={styles.selectBox} variant="outlined">
                            <InputLabel htmlFor="outlined-data-simple">
                                Measurements
                            </InputLabel>
                            <Select
                                style={styles.select}
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
                            <MenuItem style={styles.select}value={"co2"}>
                                Carbon Dioxide
                            </MenuItem>
                            <MenuItem style={styles.select}value={"so2"}>
                                Sulfur Dioxide
                            </MenuItem>
                            <MenuItem style={styles.select}value={"pa"}>
                                Atomspheric Pressure
                            </MenuItem>
                            <MenuItem style={styles.select}value={"wind"}>
                                Wind Speed
                            </MenuItem>
                            <MenuItem style={styles.select}value={"uv"}>
                                Ultraviolet
                            </MenuItem>
                            <MenuItem style={styles.select}value={"hum"}>
                                Humidity
                            </MenuItem>
                            <MenuItem style={styles.select}value={"rad"}>
                                Radiation
                            </MenuItem>
                            </Select>
                        </FormControl>
                        
                        <div style={styles.button}>
                            <Button 
                                onClick={this.onSubmit}
                                style={{width: "100%", backgroundColor: "rgb(242, 242, 242)", fontFamily: "Quicksand"}}>
                                Submit
                            </Button>
                        </div>
                        <List style={styles.list}>
                            {this.state.data.map((itm, idx) => (
                                <ListItem key={idx} style={styles.listItm}>{deviceIDs[idx] + ' ' + itm}</ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

export default ThreeDPage;