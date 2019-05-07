import React, { Component } from 'react'
import { Input, Container, Table, Button, Alert } from 'reactstrap'
import axios from 'axios';
import config from '../config/index';
import { withRouter } from 'react-router-dom';
import calculateSumOfCore from '../helpers/calculateSumOfScores';
import RowGame from '../components/gameScore/RowGame';
class GameScore extends Component {

    state = {
        game: null,
        success: false,
    }


    componentDidMount() {

        /* get gameId */
        const pathName = this.props.location.pathname;
        const gameId = pathName.split('/')[pathName.split('/').length - 1];

        /* call ajax to get infomation of player */
        axios({

            url: `${config.baseUrl}/api/games/${gameId}`,
            method: 'get',

        })
            .then((response) => {

                console.log('data', response.data)

                this.setState({

                    success: response.data.success,
                    game: response.data.game,

                })

            })
            .catch((error) => {

                console.log(error);

            })

    }

    //
    handleInputChange = (value, row, col) => {

        //* send axios */
        axios({
            url: `${config.baseUrl}/api/games/${this.state.game._id}`,
            method: 'put',
            data: {
                type: 'update_scores',
                value,
                row,
                col,
            }
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        /* update State */
        const newGame = this.state.game;
        newGame.scores[row][col] = value;

        this.setState({
            game: newGame,
        })

    }

    handleAddRound = () => {

        /* send axios to addround */
        axios({

            url: `${config.baseUrl}/api/games/${this.state.game._id}`,
            method: 'put',
            data: {
                type: 'add_round',
            }

        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })

        //update state
        const newGame = this.state.game;
        newGame.scores.push([0, 0, 0, 0]);

        this.setState({
            game: newGame
        })
    }


    render() {


        if (this.state.success) {

            console.log(this.state);

            const sumOfScore = calculateSumOfCore(this.state.game.scores);
            const totalSumOfScore = sumOfScore.reduce((left, right) => left + right);

            return (
                <div className='game-score'>
                    <Container>

                        <h2>Score Keeper</h2>

                        <Table>

                            <thead>

                                <tr>
                                    <td></td>
                                    {
                                        this.state.game.players.map((player, index) => <td key={index}>{player}</td>)
                                    }
                                </tr>

                                <tr>
                                    <td> Sum Of Score ( {totalSumOfScore} ) </td>
                                    {
                                        sumOfScore.map((score, index) => <td key={index}> {score} </td>)
                                    }
                                </tr>

                            </thead>

                            <tbody>
                                {
                                    this.state.game.scores.map((scoreArray, index) => {
                                        return (
                                            <RowGame
                                                key={index}
                                                rowScore={scoreArray}
                                                rowIndex={index}
                                                handleInputChange={this.handleInputChange}
                                            >

                                            </RowGame>
                                        )
                                    })
                                }

                            </tbody>

                        </Table>

                        <Button onClick={this.handleAddRound} >Add Round</Button>

                    </Container>
                </div>
            )

        }
        return (
            <div className='game-score'>
                <Container>
                    <Alert color='danger'>
                        Game not exist
                    </Alert>

                </Container>
            </div>
        )


    }
}

export default withRouter(GameScore);