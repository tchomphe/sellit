import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';

window.onload = () => {
    ReactDOM.render(<Layout />, document.getElementById('container'));
};