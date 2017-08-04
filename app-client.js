import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

window.onload = () => {
    ReactDOM.render(<AppRoutes />, document.getElementById('container'));

    // Initialize modal plugin
    $('.modal').modal({
        ready: function(modal, trigger){
            $('.carousel').removeClass('hide');
            $('.carousel').carousel({dist:0,shift:0,padding:0});
        },
        complete: function(modal, trigger){
            $('.carousel').addClass('hide');
        }
    });

};