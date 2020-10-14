import React, { Component } from "react";
import LogIn from "./LogInComponent"
import Register from "./RegisterComponent"
import { styles } from "../styles/HomeComponentStyle"

class Home extends Component {


    render() {
        
        return (
            <div className="container-fluid" style={{ padding: "0"}}>
             {this.props.form ==="register" ?
                <div className=" col-xs-2 col-md-6" style={Object.assign({}, 
                styles.home, styles.registerHome)}>
                    <h1 style={{ color: "white" }}>The2app</h1>
                </div>
               :
               <div className=" col-xs-2 col-md-6" 
               style={Object.assign({}, styles.home, styles.loginHome)}>
               <h1 style={{ color: "white" }}>The2app</h1>
               </div>
               }
                <div style={styles.formDiv} className="col-xs-10 col-md-6">
                    {this.props.form ==="register" ? 
                    <Register change_status={this.props.change_status} isLoggedIn={this.props.isLoggedIn}/>
                     :<LogIn change_status={this.props.change_status} isLoggedIn={this.props.isLoggedIn}/>
                      }
                </div>

            </div>
        );
    }
}

export default Home;
