import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

window.onload = () => {
    ReactDOM.render(<AppRoutes />, document.getElementById('container'));

    //display NavigationWindow on page load
    // $('#navModal').modal('show');
    //$('#navModal').modal('open');
    $('.modal').modal();
    $('#navModal').modal('open');

};