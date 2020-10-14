import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import NavBar from './NavBarComponent'
import { Spinner } from 'react-bootstrap'
import axios from 'axios'
import CardComponent from './CardComponent'
import { styles } from '../styles/ListStyle'


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            addListClicked: false,
            addCardClicked: false,
            listTitleInput: "",
            cardText: "",
            lists: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clickedAddList = this.clickedAddList.bind(this);
        this.clickedAddCard = this.clickedAddCard.bind(this);
        this.addList = this.addList.bind(this)
        this.addCard = this.addCard.bind(this)
        this.deleteList = this.deleteList.bind(this)
    }


    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    clickedAddCard(x, y) {
        this.setState({
            addCardClicked: x,
            targetedList: y,
            cardText: ""
        })

    }

    clickedAddList(x) {
        this.setState({
            addListClicked: x,
            listTitleInput: ""
        })
    }

    addCard() {
        if(!this.state.cardText){return alert("please enter content to the card")}
        var newCard = {
            card_content: this.state.cardText,
            list_id: this.state.targetedList
        }
        axios.post(`http://192.168.1.5:5000/cards/add`, newCard, { withCredentials: true })
            .then(
                res => {
                    if (res.status === 201 && res.data.card_added === true) {
                        //   window.location.reload(false);
                        this.setState({
                            addCardClicked: false,
                            targetedList: "",
                            cardText: ""
                        })
                        this.componentDidMount()
                    }
                }
            )
            .catch(err => {
                if (err.response.status === 401 && err.response.data.message === "not logged_in") { this.props.notLoggedIn() }
                else if (err.response.status === 500) { alert("try again !") }
            })
    }

    deleteList(id) {
        var list_id = id
        axios.delete(`http://192.168.1.5:5000/lists/delete/` + list_id, { withCredentials: true })
            .then(
                res => {
                    if (res.status === 200 && res.data.deleted === true) {
                        window.location.reload(false);
                    }
                }
            )
            .catch(err => {
                if (err.response.status === 401 && err.response.data.message === "not logged_in") { this.props.notLoggedIn() }
                else if (err.response.status === 409) { alert("list already deleted or doesn't exist") }
                else if (err.response.status === 500) { alert("try again") }
            })
    }

    addList() {
        if(!this.state.listTitleInput){return alert("please enter a title to the list")}
        axios.post(`http://192.168.1.5:5000/lists/add`, { list_name: this.state.listTitleInput }, { withCredentials: true })
            .then(
                res => {
                    if (res.status === 201 && res.data.list_added === true) {
                        //  window.location.reload(false);
                        this.setState({
                            addListClicked: false,
                            listTitleInput: ""
                        })
                        this.componentDidMount()
                    }
                }
            )
            .catch(err => {
                if (err.response.status === 401 && err.response.data.message === "not logged_in") { this.props.notLoggedIn() }
                else if (err.response.status === 500) { alert("try again !") }
            })
    }

    componentDidMount() {
        axios.get('http://192.168.1.5:5000/lists/list', { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ lists: res.data.lists })
                    this.setState({ isLoading: false })
                }
            })
            .catch(err => {
                if (err.response.status === 401 && err.response.data.message === "not logged_in")
                    this.props.notLoggedIn()
            })
    }

    render() {
        const lists = this.state.lists.map((list) => {
            return (
                <div key={list.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
                    <div style={styles.container}>
                        <h4 style={styles.listTitle}>2 {list.title}</h4>

                        <Button size="sm" style={styles.deleteList} onClick={()=>this.deleteList(list.id)} variant="danger">
                            <span aria-hidden="true">&times;</span>
                        </Button>

                        <CardComponent cards={list.cards} />

                        {(this.state.addCardClicked && this.state.targetedList === list.id) ?
                            <Card style={styles.newCard}>
                                <TextareaAutosize placeholder="enter ..." autoFocus
                                    value={this.state.cardText} name="cardText" onChange={this.handleInputChange}
                                    style={{ resize: "none" }}
                                />
                                <div >
                                    <Button style={styles.addCard} className="col-8"
                                        onClick={this.addCard} variant="outline-success" >add</Button>
                                    <Button style={styles.cancelAddingCard} className="col-2"
                                        onClick={() => { this.clickedAddCard(false, "") }} variant="outline-danger">x</Button>
                                </div>
                            </Card>
                            :
                            <Button size="lg" style={{border:"none"}} variant="outline-success"
                                onClick={() => { this.clickedAddCard(true, list.id) }}>+</Button>
                      }
                    </div>
                </div>
            );
        })
        return (
            <React.Fragment>           
          {this.state.isLoading ? <Spinner animation="grow" />
           : 
            <div className="container-fluid" style={styles.body}>

                <NavBar change_status={this.props.change_status}
                    clickedAddList={this.clickedAddList} />
            <div >
                <div className="row" style={{paddingTop:"70px"}}>
                    {this.state.addListClicked ?
                        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
                            <div style={styles.container}>
                                <div style={{width:"80%",marginLeft:"10%"}}>
                                    <h4 style={styles.listTitle}>2</h4>
                                    <TextareaAutosize placeholder="enter ..." autoFocus
                                        value={this.state.listTitleInput} name="listTitleInput" onChange={this.handleInputChange}
                                        style={styles.listTextArea} />
                                    <Button style={styles.addList} className="col-8"
                                        onClick={this.addList} variant="outline-success">add list</Button>
                                    <Button style={styles.cancelAddingList} className="col-2"
                                        onClick={() => { this.clickedAddList(false) }} variant="outline-danger">x</Button>
                                </div>
                            </div>
                        </div>
                        : <div></div>

                    }

                    {lists}
                    {this.state.lists.length === 0 && this.state.addListClicked===false ?
                       <div style={{
                        width:"100%",
                        height:window.innerHeight*0.8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                       }}>
                           <h2>No list</h2>
                       </div> 
                       :
                       <div></div>
                    }
    
                </div>
                </div>
            </div>
        } 
                </React.Fragment>                
        
        );
    }
}


export default List;