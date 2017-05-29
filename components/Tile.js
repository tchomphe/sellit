import React from 'react';

export default class Tile extends React.Component {
    render(){
        return(
            <div className="tile card">
                <img className="card-img-top" src="https://placehold.it/350x250" alt="Card image cap" />
                <h4 className="card-title">{this.props.title}</h4>
                <p className="card-text"><strong>Address</strong>: {this.props.address}</p>
            </div>
        )
    }
}

Tile.propTypes = {
    title: React.PropTypes.string.isRequired,
    address: React.PropTypes.string.isRequired,
}