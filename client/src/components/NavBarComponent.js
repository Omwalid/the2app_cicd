import React, { Component } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import axios from "axios";

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        axios.get(`http://192.168.1.5:5000/users/logout`, { withCredentials: true })
            .then(
                async res => {
                    if (res.status === 200 && res.data.loggedOut === true) {
                        this.props.change_status(false, {})
                        console.log('logged-out')
                    }
                    else { console.log("user still logged-in") }
                }
            )
            .catch(e => { console.log(e) })
    }

    render() {
         console.log(this.props.addList);
        return (
            <div style={{width:"100%",position:"absolute",right:"0",top:"0",left:"0"}}>
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Navbar.Brand href="#home">welcome to the2app</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                        <Nav >
                            <Button variant="dark" ><Nav.Link href="/">Home</Nav.Link></Button>
                            <Button variant="dark" ><Nav.Link href="/about_us">About Us</Nav.Link></Button>
                           {this.props.addList !=="false" ? <Button variant="outline-success" onClick={()=>{this.props.clickedAddList(true)}}>add list</Button> : null} 
                            <Button variant="dark" onClick={this.logout} >logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                
            </div>
        );
    }
}

export default NavBar;