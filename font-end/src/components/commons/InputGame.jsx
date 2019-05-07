import React from 'react';
import { Input } from 'reactstrap';

//props
//type
// index
//value
//placeholder
//handleIputChange

const InputGame = (props) => {
    return (
        <Input
            style={props.style}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            onChange={(e) => {
                props.handleInputChange(props.index, e.target.value.trim())
            }}
        />
    )
}

export default InputGame;