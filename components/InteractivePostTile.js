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
    }

    componentDidMount(){
        //initialize Post Modals.. again TODO: figure out if it's possible to instantiate all modals from one place
        $('.modal').modal();
        $('.postModal').modal({
            ready: function(modal, trigger){
                $('.carousel').removeClass('hide');
                $('.carousel').carousel({dist:0,shift:0,padding:0});
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
        this.props.updatePostEditModal(this.props.post);
    }

    handleDelete(e){
        e.preventDefault();         
        $('#modalDelete').modal('open');        
    }
    deletePost(e){
        e.preventDefault();
        this.props.handleDelete(this.props.post);
    }

    render(){        
        var thumbnailImage = (this.props.post.thumbnail) ? this.props.post.thumbnail : "https://placehold.it/350x250";

        return(            
            <div className="card">
                <a onClick={(e) => (this.handleEdit(e))} className="waves-effect waves-light btn-large blue"><i className="material-icons right">edit</i>EDIT</a>
                <a onClick={(e) => (this.handleDelete(e))} className="waves-effect waves-light btn-large red"><i className="material-icons right">delete</i>DELETE</a>

                <div className="card-image">
                    <a href="#!" onClick={(e) => (this.handlePreview(e))} className="waves-effect waves-light">
                        <img src={thumbnailImage} alt="Card image cap" />
                    </a>
                </div>
                <div className="card-content">
                    <span className="card-title">{this.props.post.title}</span>
                    <p className="card-text"><i className="tiny material-icons">location_on</i> {this.props.post.address}</p>                
                </div>
                <div id="modalDelete" className="modal">
                    <div className="modal-content">
                        <h5>Confirm Delete</h5>                        
                        <a href="#!" className="modal-action modal-close waves-effect waves-red btn-flat ">Cancel</a>
                        <a onClick={(e)=>(this.deletePost(e))} href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Delete</a>
                    </div>
                </div>
                <PostModal
                    prevPostId={this.props.prevPostId}
                    nextPostId={this.props.nextPostId}
                    modalID={this.props.postModalID}
                    title={this.props.post.title}
                    price={this.props.post.price}
                    address={this.props.post.address}
                    description={this.props.post.description}
                    images={this.props.post.images}
                    ownerId={this.props.post.ownerID}
                    email={'placeholder@placehoder.email'} />                    
            </div>                        
        )
    }
}

InteractivePostTile.propTypes = {
    post: PropTypes.object.isRequired,
    updatePostEditModal: PropTypes.func.isRequired,
    postModalID: PropTypes.string.isRequired,
}