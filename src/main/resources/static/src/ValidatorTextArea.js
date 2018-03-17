import React from 'react';

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

export default ValidatorTextArea;