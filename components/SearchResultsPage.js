import React from 'react';
import PropTypes from 'prop-types';

export default class SearchResultsPage extends React.Component{
    render(){
        return(
            <h1>{this.props.match.params.query}</h1>
        )
    }
}