import React from 'react';
import PropTypes from 'prop-types';

const ValidatorTextArea = (props) => {

    let { label, valid, validationMessage, name, handleChange } = props;

    return (
        <div className="column">
            <div className="field">
                <label className="label">
                    {label}

                    {!valid &&
                        <span class="tag is-danger is-pulled-right">Invalid JSON: {validationMessage} </span>
                    }

                </label>
                <div className="control">
                    <textarea
                        className="textarea"
                        name={name}
                        rows="20"
                        onChange={handleChange}>
                    </textarea>
                </div>
            </div>
        </div>
    )
};

ValidatorTextArea.propTypes = {
    label: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default ValidatorTextArea;