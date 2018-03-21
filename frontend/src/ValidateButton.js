import React from 'react';
import PropTypes from 'prop-types';

const ValidateButton = ({ disabled, validate }) => {
    return (
        <input className="button is-primary"
            type="button"
            value="Validate"
            disabled={disabled}
            onClick={validate} />
    )
};

ValidateButton.propTypes = {
    disabled: PropTypes.bool.isRequired,
    validate: PropTypes.func.isRequired
}

export default ValidateButton;