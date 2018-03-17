import React from 'react';

const ClearButton = (props) => {

    return (
        <input className="button is-white" 
        type="button" 
        value="Clear" 
        onClick={props.clear}/>
    );
}

export default ClearButton;