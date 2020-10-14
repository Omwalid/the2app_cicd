import React, { Component } from 'react'
import NavBar from './NavBarComponent'
import { Card } from 'react-bootstrap';
import { styles } from '../styles/AboutUsStyle'




class AboutUs extends Component {

    render() {
        return (
            <div style={styles.body}>
                <NavBar change_status={this.props.change_status} addList="false" />
                <div style={styles.divCard} className="col-10" >
                    <Card style={styles.card}>
                        <Card.Header>the2app</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    is a productivity app, that helps you to free your mind, and save information "exemple
                                    : 2 read, 2 watch ...", the goal of this app is not commercial, but for learning perpos,
                                    it was developed to apply to it CI/CD
                            </p>
                                <footer className="blockquote-footer">
                                    developed by OUGHERB MOHAMMED WALID {''}
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }


}

export default AboutUs;