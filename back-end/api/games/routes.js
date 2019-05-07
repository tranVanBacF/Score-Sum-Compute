const express = require('express');
const GameModel = require('./model');

const gameRouter = express();

/*create game  */
gameRouter.post('/', async (req, res) => {
    try {


        /* take players from body */
        const { players } = req.body;

        /* create new game */
        const newGame = await GameModel.create({
            players: players,
            scores: [],

        })

        /* return new game has been created */
        res.status(200).json(newGame);

    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }

})

/* get game by id */
gameRouter.get('/:gameId', async (req, res) => {
    try {

        /* get gameId */
        const { gameId } = req.params;

        const Game = {
            success: true,
            game: null,
        }

        /* check gameId is type ObjectId */
        if (!gameId.match(/^[0-9a-fA-F]{24}$/)) {
            Game.success = false;
        } else {
            /* find gameInfo */
            const gameInfo = await GameModel.findById(gameId).exec();

            Game.success = Boolean(gameInfo);

            Game.game = gameInfo;
        }


        /* return gameInfo */
        res.status(200).json(Game);

    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Internal server error')
    }
})


/* insert new round and fix score */
gameRouter.put('/:gameId', async (req, res) => {
    try {
        /* get gameId from params */
        const { gameId } = req.params;

        /* check gameId is valid ObjectId type */
        if (!gameId.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).end('Game not found');
            return;
        } else {

            /* find Game */
            const existedGame = await GameModel.findById(gameId).exec();

            if (!existedGame) {

            } else {

                if (req.body.type === 'add_round') {

                    /* insert new round to scores */
                    await GameModel.findByIdAndUpdate(gameId, {
                        $push: {
                            scores: [0, 0, 0, 0]
                        }
                    }).exec();

                    res.status(200).end();

                } else if (req.body.type === 'update_scores') {

                    console.log('2222', req.body);

                    const newScores = existedGame.scores;

                    /* check cell in newScore is exist */
                    if (req.body.row > newScores.length - 1 || newScores[req.body.row][req.body.col] === undefined) {
                        console.log(1);

                        res.status(200).end();
                        return;
                    }
                    console.log(2);
                    /* update scores in newScore */
                    newScores[req.body.row][req.body.col] = req.body.value;

                    /* update scores in db */
                    await GameModel.findByIdAndUpdate(gameId, {

                        $set: {

                            scores: newScores,

                        }
                    }).exec();

                    console.log(3);

                    res.status(200).end();

                }

            }
        }

    } catch (error) {

        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
})


module.exports = gameRouter;