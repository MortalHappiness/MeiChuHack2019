import React from 'react';
import classes from './css/Header.module.css';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
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

class Header extends React.Component {
    render() {
        return(
            <div className={classes.header}>
                <div className={classes.buttonContainer}>
                    <Button style={styles.button}>
                        <NavLink style={styles.link} to='/'>Home</NavLink>
                    </Button>
                    <Button style={styles.button}>
                        <NavLink style={styles.link} to='/sensorMap'>3D Rendering</NavLink>
                    </Button>
                    <Button style={styles.button}>
                        <NavLink style={styles.link} to='/sensorTrack'>Data Tracking</NavLink>
                    </Button>
                    <Button style={styles.button}>
                        <NavLink style={styles.link} to='/download'>Download Data</NavLink>
                    </Button>
                </div>
            </div>
        )
    }
}

export default Header;