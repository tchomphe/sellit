import React from 'react';
import PropTypes from 'prop-types';
import PostModal from './PostModal';
import Moment from 'react-moment';

export default class PostTile extends React.Component {
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
    handleSubmit(e){
        e.preventDefault();
        $('#'+this.props.postModalID).modal('open');
    }

    render(){
        var thumbnailImage = (this.props.post.thumbnail) ? ("/assets/uploads/" + this.props.post.thumbnail) : "https://placehold.it/350x250";

        return(
                <div className="card">
                    <div className="card-image">
                        <a href="#!" onClick={(e) => (this.handleSubmit(e))}>
                            <img src={thumbnailImage} alt="Card image cap" />
                        </a>
                        <div className="card-image-price">{(this.props.post.price) ? "$"+this.props.post.price : "--"}</div>
                    </div>

                    <div className="card-content">
                        {/* <span className="card-title activator truncate">{this.props.post.title}<i className="material-icons right">keyboard_arrow_up</i></span> */}
                        <span className="card-title truncate activator">{this.props.post.title}</span>
                        <p className="left-align card-text"><i className="material-icons position">location_on</i>{this.props.post.location}</p>
                        <p className="right-align card-text posted-date"><Moment fromNow>{this.props.post.date}</Moment></p>
                    </div>

                    <div className="card-reveal">
                        <span className="card-title truncate">{this.props.post.title}<i className="material-icons ">close</i></span>
                        <p className="left-align">{this.props.post.description}</p>
                    </div>

                    <PostModal
                            prevPostId={this.props.prevPostId}
                            nextPostId={this.props.nextPostId}
                            modalID={this.props.postModalID}
                            title={this.props.post.title}
                            price={this.props.post.price}
                            address={this.props.post.address}
                            location={this.props.post.location}
                            description={this.props.post.description}
                            images={this.props.post.images}
                            ownerId={this.props.post.ownerID} />
                </div>
        )
    }
}

PostTile.propTypes = {
    post: PropTypes.object.isRequired,
    postModalID: PropTypes.string.isRequired,
}