import React from 'react';
import Mr_Miserable from '../media/Mr_Miserable.png'
import Mr_worry from '../media/Mr_worry.png'

const ErrorPage = (props) => {
    return (
        <div id='error-container'>
            <img src={Mr_Miserable} alt="Mr Miserable looking Miserable" height='200' />
            <div id="error-info">
                <p className="error-message">{props.errorMessage}</p>
            </div>
            <img src={Mr_worry} alt="Mr Worry looking Worried" height='180' />
        </div>
    );
};

export default ErrorPage;