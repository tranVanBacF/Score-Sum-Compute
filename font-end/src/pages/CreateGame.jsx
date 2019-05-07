import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import config from '../config/index';
import { Form, Container, Button, Input, Alert } from 'reactstrap';
import InputGame from '../components/commons/InputGame';

class CreateGame extends Component {

    state = {
        players: ['', '', '', ''],
        alertVisible: false,
    }

    //hande submit
    handleSubmit = (e) => {

        e.preventDefault();

        let isShow = this.state.players.indexOf('') > -1;

        this.setState({
            alertVisible: isShow,
        })

        if (isShow) {
            return;
        }

        /* send ajax to create game */
        axios({

            url: `${config.baseUrl}/api/games`,
            method: 'post',
            data: {
                players: this.state.players,
            }

        })
            .then((response) => {

                this.props.history.push(`/games/${response.data._id}`);

            })
            .catch((error) => {

                console.log(error);

            })



    }

    handleInputChange = (index, value) => {

        this.setState({

            players: this.state.players.map((item, indexItem) => {
                if (indexItem === index)
                    return value
                return item;
            }),

            alertVisible: false,

        })

    }

    render() {
        console.log(this.state);

        return (
            <div className='create-game'>

                <h2>Score Keeper</h2>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        {
                            this.state.players.map((player, index) => {
                                return (
                                    <InputGame
                                        style={{ marginBottom: '10px' }}

                                        key={index}
                                        type={'text'}
                                        value={player}
                                        index={index}
                                        placeholder={' player ' + (index + 1)}
                                        handleInputChange={this.handleInputChange}

                                    />
                                )
                            })

                        }

                        {
                            this.state.alertVisible
                                ?
                                (
                                    <Alert color='danger'>
                                        please input player {this.state.players.indexOf('') + 1}

                                    </Alert>
                                )
                                :
                                null
                        }

                        <Button type='submit'>Submit</Button>

                    </Form>

                </Container>



            </div>
        )
    }
}

export default withRouter(CreateGame)