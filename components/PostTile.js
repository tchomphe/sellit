import React from 'react';
import PropTypes from 'prop-types';

export default class PostTile extends React.Component {
    render(){
        return(
            <div className="card">
                <div className="card-image">
                    <a href="#postModal" className="waves-effect waves-light">
                        <img src="https://placehold.it/350x250" alt="Card image cap" />
                    </a>
                </div>
                <div className="card-content">
                    <span className="card-title">{this.props.title}</span>
                    <p className="card-text"><strong>Address</strong>: {this.props.address}</p>
                </div>
            </div>
        )
    }
}

PostTile.propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
}