import React from 'react';
import classes from './css/App.module.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import DataTrackPage from './DataTrackPage.jsx';
import DownloadPage from './DownloadPage.jsx';
import HomePage from './HomePage.jsx';
import ThreeDPage from './ThreeDPage.jsx';
import Button from '@material-ui/core/Button';

const styles = {
    button: {
        fontFamily: 'Quicksand',
        textAlign: "center",
        width: "20%",
        marginLeft: "2.5%",
        marginRight: "2.5%",
    },
    link: {
        textDecoration: 'none',
        color: "black"
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'home'
        }
    }

    onClick(pageState){
        this.setState({
            page: pageState,
        })
    }
    render(){
        let page = null;
        if(this.state.page === 'home') page = <HomePage />;
        else if(this.state.page === 'sensormap') page = <ThreeDPage />;
        else if(this.state.page === 'sensortrack') page = <DataTrackPage />;
        else page = <DownloadPage />;
        return (
            <div className={classes.app}>
                <div className={classes.header}>
                    <div className={classes.buttonContainer}>
                        <Button 
                            onClick={() => {this.onClick('home');}} 
                            style={styles.button}
                        >
                            Home
                        </Button>
                        <Button 
                            onClick={() => {this.onClick('sensormap');}} 
                            style={styles.button}
                        >
                            3D Rendering
                        </Button>
                        <Button 
                            onClick={() => {this.onClick('sensortrack');}} 
                            style={styles.button}
                        >
                            Data Tracking
                        </Button>
                        <Button 
                            onClick={() => {this.onClick('download');}} 
                            style={styles.button}>
                            Download Data
                        </Button>
                    </div>
                </div>
                {page}
            </div>
        )
    }
}

export default App;