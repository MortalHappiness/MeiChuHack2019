import React from 'react';
import classes from './css/HomePage.module.css';

const styles = {
    title: {
        marginLeft: "100px",
        marginTop: "200px",
        fontSize: "150px",
        fontFamily: "Poiret One"
    },
    sub: {
        marginTop: "20px",
        marginLeft: "250px",
        fontFamily: "Quicksand",
        fontSize: "40px",
    },
    img: {
        width: "80%",
        marginTop: "100px"
    }
}

class HomePage extends React.Component {
    render() {
        return (
            <div className={classes.page}>
                <div className={classes.leftContainer}>
                    <div className="animated fadeIn slow delay-2s" style={styles.title}>ECO-FIKSU</div>
                    <div className="animated fadeIn slow delay-3s" style={styles.sub}>
                        The next generation <br></br> eco-smart park management system.
                    </div>
                </div>
                <div className={classes.rightContainer}>
                    <img className="animated fadeIn slow delay-2s" style={styles.img} src="https://icon-library.net/images/environmentally-friendly-icon/environmentally-friendly-icon-10.jpg"></img>
                </div>
            </div>
        )
    }
}

export default HomePage;