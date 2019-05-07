const calculateSumOfScores  = (scores) =>{

    const sumOfScore = [0,0,0,0];

    for( let row = 0 ; row < scores.length ; row += 1){
        for( let col = 0 ; col < scores[row].length ; col += 1){
            sumOfScore [col] += Number( scores[row][col]);
        }
    }

    return sumOfScore;
}

export default calculateSumOfScores;
