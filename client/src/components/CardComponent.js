import React, { Component } from 'react'
import { Card, Dropdown } from 'react-bootstrap';
import axios from 'axios'
import { styles } from '../styles/CardStyle.js'


class CardComponent extends Component {

    constructor(props) {
        super(props);
        this.deleteCard = this.deleteCard.bind(this)
    }

    deleteCard(id) {
        var card_id = id
        axios.delete(`http://192.168.1.5:5000/cards/delete/` + card_id, { withCredentials: true })
            .then(
                res => {
                    if (res.status === 200 && res.data.deleted === true) {
                        window.location.reload(false);
                    }
                }
            )
            .catch(err => {
                if (err.response.status === 401 && err.response.data.message === "not logged_in") { this.props.notLoggedIn() }
                else if (err.response.status === 409) { alert("card already deleted or doesn't exist") }
                else if (err.response.status === 500) { alert("try again") }
            })
    }

    render() {
        const allCards = this.props.cards.map((card) => {
            return (
                <Card key={card.id} style={styles.card}>
                    <Card.Body className="row">
                        <p className="col-10">{card.text}</p>
                    <Dropdown className="col-2" style={styles.dropdown2}>
                            <Dropdown.Toggle split variant="outline-light" style={styles.dropdownToggle} id="dropdown-split-basic" />
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>this.deleteCard(card.id)}>delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card.Body>


                </Card>
            );
        })
        return (
            <div style={styles.allCards}>
                {allCards}
            </div>
        );
    }
}

export default CardComponent;