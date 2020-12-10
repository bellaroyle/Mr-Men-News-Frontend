import React from 'react';
import Mr_worry from '../media/Mr_worry.png'
import Mr_scatterbrain from '../media/Mr_scatterbrain.png'

const ErrorPage = (props) => {
    return (
        <div id='error-container'>
            <img src={Mr_scatterbrain} alt="Mr Scatterbrain looking Confused" height='200' />
            <div id="error-info">
                <p className="error-message">{props.errorMessage}</p>

            </div>

            <img src={Mr_worry} alt="Mr Worry looking Worried" height='180' />
        </div>
    );
};

export default ErrorPage;