import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import List from './ListComponent'
import AboutUs from './AboutUsComponent'
import Home from './HomeComponent'
import Axios from "axios";
import { Spinner } from 'react-bootstrap'


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLoggedIn: false,
            user: {}
        }
        this.change_status = this.change_status.bind(this);

    }


    change_status(bol, ob) {
        this.setState({ isLoggedIn: bol, user: ob })

    }
    check_Login() {
        Axios.get('http://192.168.1.5:5000/users/logged_in', { withCredentials: true })
            .then(res => {
                if (res.data.isLoggedIn === true && this.state.isLoggedIn === false) {
                    this.change_status(true, res.data.user)
                }
                else if (!res.data.isLoggedIn && this.state.isLoggedIn) {
                    this.change_status(false, {})
                }
                this.setState({ isLoading: false })
            })
            .catch(err => {
                if (err.response) this.setState({ isLoading: false })
                // console.log(err.response.data.message);
            })
    }

    componentDidMount() {
        this.check_Login();
    }
    render() {
        return (
            <div >
                {this.state.isLoading ? <Spinner animation="grow" /> :
                    <div>
                        <Switch>
                            <Route exact path="/">{this.state.isLoggedIn ?<Redirect to="/lists" /> 
                                                   :<Home change_status={this.change_status} isLoggedIn={this.state.isLoggedIn} />} </Route>
                            <Route path="/register">{this.state.isLoggedIn ?<Redirect to="/lists" />
                                                   :<Home form="register" change_status={this.change_status} isLoggedIn={this.state.isLoggedIn} />}</Route>
                            <Route path="/lists">{this.state.isLoggedIn ?<List notLoggedIn={()=>{this.change_status(false, {})}} change_status={this.change_status} /> 
                                                   :<Redirect to="/" />}</Route>
                            <Route path="/about_us">{this.state.isLoggedIn ?<AboutUs change_status={this.change_status} /> 
                                                   :<Redirect to="/" />}</Route>
                            <Redirect to="/" />
                        </Switch>
                    </div>
                }
            </div>

        );
    }
}

export default Main;