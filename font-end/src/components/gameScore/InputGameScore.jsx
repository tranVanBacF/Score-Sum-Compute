import React from 'react';
import { Input } from 'reactstrap';

//props
//type
// index
//value
//placeholder
//handleIputChange

const InputGameScore = (props) => {
    return (
        <Input
            type={props.type}
            value={props.value}
            onChange={(e) => {
                props.handleInputChange( e.target.value.trim(), props.rowIndex,props.colIndex)
            }}
        />
    )
}

export default InputGameScore;