import React from 'react';
import PropTypes from 'prop-types';

const ClearButton = (props) => {

    return (
        <input className="button is-white" 
        type="button" 
        value="Clear" 
        onClick={props.clear}/>
    );
}

ClearButton.propTypes = {
    clear: PropTypes.func.isRequired
}

export default ClearButton;