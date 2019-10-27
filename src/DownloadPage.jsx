import React from 'react';
import classes from './css/downloadPage.module.css';    
import Typography from '@material-ui/core/Typography';
import CloudDownload from '@material-ui/icons/CloudDownloadOutlined';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button';
import { deviceIDs, datatypes } from './const.js';
import { download_file } from './utils.js';

const styles = {
    title: {
        fontFamily: 'Quicksand',
        fontSize: "40px",
        paddingTop: "50px",
        marginBottom: "25px",
        textAlign: 'center',
    },
    text: {
        fontFamily: "Quicksand"
    },
    explanation: {
        marginTop: "100px",
        marginBottom: "50px",
        fontSize: "25px",
        textAlign: "center"
    },
    heading: {
        fontFamily: "Quicksand",
        fontSize: "20px",
    },
    panel: {
        width: "60%",
        margin: "0 auto",
    },
    select: {
        fontFamily: "Quicksand"
    },
    selectBox: {
        fontFamily: "Quicksand",
        width: "60%",
        marginLeft: "20%",
        marginTop: "20px",
    },
    button: {
        width: "20%",
        margin: "0 auto",
        marginTop: "20px"
    }
}

let json = (<pre>{`
{
    "device1": {
        "sensor1": {
            data: [1.1, 2.2, 3.3],
            name: "value1"
        },
        "sensor2": {
            data: [4.4, 5.5, 6.6],
            name: "value2"
        }
    }
}
`}</pre>);

let csv = (<pre>{`
,,  value1,  value2
1,       1.1,       4.4
2,       2.2,       5.5
3,       3.3,       6.6
`}</pre>)

class DownloadPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            deviceID: deviceIDs[0],
            dataType: [datatypes[0]],
            pastN: 10,
            format: 'json'
        }
    }

    handleChange = event => {
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onSubmit = () => {
        let payload = {
            id: this.state.deviceID,
            type: this.state.dataType,
            n: this.state.pastN,
            fmt: this.state.format,
        };  
        fetch(
            "/download",
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
                download_file(data, 'test.' + this.state.format, this.state.format);
            }
        ).catch(err => {
            console.log(err);
        });
        return;
    }

    render() {
        return (
            <div className={classes.page}>
                <div style={styles.title}>
                    Download Data <CloudDownload style={{fontSize: "40px"}}/>
                </div>
                <div style={styles.text} className={classes.lowerContainer}>
                    <div className={classes.leftContainer}>
                        <div style={styles.explanation}>
                            Our data download supports the following format:
                        </div>
                        <ExpansionPanel style={styles.panel}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography style={styles.heading}>JSON (Javascript Object Notation)</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography style={styles.text}>
                                {json}
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel style={styles.panel}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            >
                            <Typography style={styles.heading}>CSV (Comma Separated Values)</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography style={styles.text}>
                                {csv}
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                    <div className={classes.rightContainer}>
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
                        <div style={{marginLeft: "20%", marginTop: "60px"}}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Download Format</FormLabel>
                                <RadioGroup aria-label="gender" name="format" value={this.state.format} onChange={this.handleChange}>
                                <FormControlLabel value="json" control={<Radio />} label="json" />
                                <FormControlLabel value="csv" control={<Radio />} label="csv" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div style={styles.button}>
                            <Button 
                                onClick={this.onSubmit}
                                style={{width: "100%", backgroundColor: "rgb(242, 242, 242)", fontFamily: "Quicksand"}}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DownloadPage;