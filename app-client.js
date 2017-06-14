import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

window.onload = () => {
    ReactDOM.render(<AppRoutes />, document.getElementById('container'));

    // Initialize modal plugin
    $('.modal').modal();
    //display NavigationWindow on page load
    $('#navigationModal').modal('open');

};