import React from 'react';
import InputGameScore from './InputGameScore';

const RowGame = (propsFirst) => {
    return (
        <tr>
            <td> Round {propsFirst.rowIndex + 1}</td>
            {
                propsFirst.rowScore.map((score, colIndex) => {
                    return (
                        <td  key ={colIndex}>
                            <InputGameScore
                               
                                type={'number'}
                                value={score}
                                rowIndex={propsFirst.rowIndex}
                                colIndex={colIndex}
                                handleInputChange={propsFirst.handleInputChange}

                            />
                        </td>
                    )
                })

            }
        </tr>
    )
}

export default RowGame;