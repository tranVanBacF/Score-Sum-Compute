const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const gameRouter = require('./api/games/routes');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/miniHackReview', { useNewUrlParser: true, 'useFindAndModify': false }, (error) => {

    if (error) {
        throw error;
    }

    console.log('connect db sucess')

    const app = express();

    /* middleware */
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    /* allow other server send request */
    app.use(cors({

        origin: ['http://localhost:3000']

    }))

    app.use('/api/games', gameRouter);

    //start server
    app.listen(3001, (error) => {
        if (error)
            throw error
        console.log("server listen on port 3001...");
    })
})
