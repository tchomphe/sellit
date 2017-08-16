import React from 'react';
import PropTypes from 'prop-types';

export default class InteractivePostTile extends React.Component {
    handleSubmit(e){
        e.preventDefault();
        this.props.updatePostModal(this.props.post);
    }

    render(){
        return(
            <div className="card">
                <a className="waves-effect waves-light btn-large blue"><i className="material-icons right">edit</i>EDIT</a>
                <a className="waves-effect waves-light btn-large red"><i className="material-icons right">delete</i>DELETE</a>

                <div className="card-image">
                    <a href="#!" onClick={(e) => (this.handleSubmit(e))} className="waves-effect waves-light">
                        <img src="https://placehold.it/350x250" alt="Card image cap" />
                    </a>
                </div>
                <div className="card-content">
                    <span className="card-title">{this.props.post.title}</span>
                    <p className="card-text"><i className="tiny material-icons">location_on</i> {this.props.post.address}</p>
                </div>
            </div>
        )
    }
}

InteractivePostTile.propTypes = {
    post: PropTypes.object.isRequired,
    updatePostModal: PropTypes.func.isRequired,
}