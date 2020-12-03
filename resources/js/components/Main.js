import React from 'react';
import ReactDOM from 'react-dom';
import authService from '../authService';
import App from './Entry';

function Main() {
   
    return (
        <App/>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
