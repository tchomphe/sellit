import React from 'react';
import PropTypes from 'prop-types';
import PostModal from './PostModal';
import Request from 'superagent';

export default class InteractivePostTile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            err:""
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteConfirmation = this.deleteConfirmation.bind(this);
    }

    componentDidMount(){
        //initialize Post Modals.. again TODO: figure out if it's possible to instantiate all modals from one place
        $('.modal').modal();
        $('.postModal').modal({
            ready: function(modal, trigger){
                $('.carousel').removeClass('hide');
                $('.carousel').carousel({dist:0,shift:0,padding:0,fullWidth:true});
            },
            complete: function(modal, trigger){
                $('.carousel').addClass('hide');
            }
        });
    }

    handlePreview(e){
        e.preventDefault();
        $('#'+this.props.postModalID).modal('open');
    }

    handleEdit(e){
        e.preventDefault();
        this.props.openPostEditContainer(this.props.post);
    }

    handleDelete(e){
        e.preventDefault();
        this.props.deletePost(this.props.post);
    }

    deleteConfirmation(e){
        e.preventDefault();
        $('#delete_' + this.props.postModalID).modal('open');
    }

    render(){
        var thumbnailImage = (this.props.post.thumbnail) ? ("/assets/uploads/" + this.props.post.thumbnail) : "https://placehold.it/350x250";

        return(
                <div className="card">
                    <div className="card-image">
                        <a href="#!" onClick={(e) => (this.handlePreview(e))} className="waves-effect waves-light">
                            <img src={thumbnailImage} alt="Card image cap" />
                        </a>
                        <div className="card-image-price">{(this.props.post.price) ? "$"+this.props.post.price : "--"}</div>
                    </div>
                    <div className="card-content">
                        <span className="card-title">{this.props.post.title}</span>
                        <p className="card-text"><i className="tiny material-icons">location_on</i> {this.props.post.city}</p>
                    </div>
                    <div className="card-action">
                        <a href="#" style={{color: '#9C9A9A'}} className="card-action-edit" onClick={(e) => (this.handleEdit(e))}><i className="material-icons">edit</i></a>
                        <a href="#" style={{color: '#9C9A9A'}} className="card-action-delete" onClick={(e) => (this.deleteConfirmation(e))}><i className="material-icons">delete</i></a>
                    </div>
                    <PostModal
                        prevPostId={this.props.prevPostId}
                        nextPostId={this.props.nextPostId}
                        modalID={this.props.postModalID}
                        title={this.props.post.title}
                        price={this.props.post.price}
                        postalCode={this.props.post.postalCode}
                        city={this.props.post.city}
                        description={this.props.post.description}
                        images={this.props.post.images}
                        ownerId={this.props.post.ownerID}
                        phone={this.props.post.phone} />
                    <div id={"delete_" + this.props.postModalID} className="modal" style={{'max-width':'400px'}}>
                        <div className="modal-content left-align">
                            <h5>Confirm</h5>
                            <p>Are you sure you want to continue?</p>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="modal-action modal-close btn black" style={{'margin-left':'5px'}}>Cancel</a>
                            <a onClick={(e) => (this.handleDelete(e))} href="#!" className="modal-action modal-close btn red">Delete</a>
                        </div>
                    </div>
                </div>
        )
    }
}

InteractivePostTile.propTypes = {
    post: PropTypes.object.isRequired,
    postModalID: PropTypes.string.isRequired,
}