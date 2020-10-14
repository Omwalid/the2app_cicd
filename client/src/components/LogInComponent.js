import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from "axios";
import {styles} from "../styles/HomeFormStyle"


class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        const name= event.target.name;
        const value= event.target.value;

        this.setState({
            [name]: value
        })

    }

    handleSubmit(event){
        event.preventDefault();
        const user={
            email: this.state.email,
            password: this.state.password
        }

        axios.post(`http://192.168.1.5:5000/users/login`,user, {withCredentials: true})
           .then( 
                res => {
                if(res.status === 200 && res.data.isLoggedIn === true) {
                    this.props.change_status(true,res.data.user)
                 //   window.location = "/user";
                }}
            )
            .catch(e => {
                if (e.response.status === 401) {
                    this.setState({ error: e.response.data.message })
               //    alert(e.response.data.message)
                }
                else console.log(e);
            })

    }

    render() {

        return (

            <Form style={styles.form} onSubmit={this.handleSubmit}>
                <p style={styles.error}>{this.state.error}</p>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"
                        value={this.state.email} onChange={this.handleInputChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"
                        value={this.state.password} onChange={this.handleInputChange} />
                </Form.Group>
                <p>new to the platform
                        <LinkContainer to="/register">
                                <a> register</a>    
                        </LinkContainer>
                </p>
                <Button style={styles.submit} type="submit">
                    Submit
            </Button>
            </Form>
        );
    }

}
export default LogIn;
