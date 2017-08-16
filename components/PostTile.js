import React from 'react';
import PropTypes from 'prop-types';

export default class PostTile extends React.Component {
    handleSubmit(e){
        e.preventDefault();
        this.props.updatePostModal(this.props.post);
    }

    render(){
        return(
            <div className="card">
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

PostTile.propTypes = {
    post: PropTypes.object.isRequired,
    updatePostModal: PropTypes.func.isRequired,
}