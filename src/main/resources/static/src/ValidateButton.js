import React from 'react';

const ValidateButton = (props) => {

    let { disabled, validate } = props;

    return (
        <input className="button is-primary"
            type="button"
            value="Validate"
            disabled={disabled}
            onClick={validate} />
    )
};

export default ValidateButton;