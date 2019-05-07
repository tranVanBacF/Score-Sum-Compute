const mongoose = require('mongoose');

//define Schema
const GameChema = new mongoose.Schema({
    
    players:[String],

    scores:[[Number]],
    
})

/* create Model  */
const GameModel = mongoose.model('Game',GameChema);

/* exports for many file can use */
module.exports = GameModel;