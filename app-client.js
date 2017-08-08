import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

window.onload = () => {
    ReactDOM.render(<AppRoutes />, document.getElementById('container'));

    // Initialize all other modals
    $('.modal').modal();

    // Initialize post modals
    $('#postModal').modal({
        ready: function(modal, trigger){
            $('.floatingBackButton').removeClass('hide');
            $('.carousel').removeClass('hide');
            $('.carousel').carousel({dist:0,shift:0,padding:0});
        },
        complete: function(modal, trigger){
            $('.carousel').addClass('hide');
        }
    });

    // Set up click handler for floating back button
    $('.floatingBackButton').click(function(){
        $('.floatingBackButton').addClass('hide');
        $('.modal').modal('close');
    })

};