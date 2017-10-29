import React from 'react';
import PostContact from './PostContact';
import Map from './Map'
import { Link, withRouter } from 'react-router-dom';

class PostModal extends React.Component{
    constructor(props){
        super(props);
        this.nextPost = this.nextPost.bind(this);
        this.prevPost = this.prevPost.bind(this);
    }
    nextPost(e){
        e.preventDefault();
        if(this.props.nextPostId !== undefined){
            $('#'+this.props.modalID).modal('close');
            $('#postModal'+this.props.nextPostId).modal('open');
            console.log(`nextPostId: ${this.props.nextPost}`);
        }
    }
    prevPost(e){
        e.preventDefault();
        // If nextPostId is 1, can't move back since you are on the first modal else move back.
        ((this.props.nextPostId) === 1) ? (            
            console.log('No previous post available.')
        ) : (
            $('#'+this.props.modalID).modal('close'),
            $('#postModal'+this.props.prevPostId).modal('open')
        );
    }
    componentDidMount(){
        $("body").keydown(function(e) {
            if(e.keyCode == 37) { // left
                console.log("Left key pressed!");
                // this.prevPost(e);
                // alert('Left');
            }
            else if(e.keyCode == 39) { // right
                console.log("Right key pressed!");
                // this.nextPost(e);
                // alert('Right');
              };
          });
    }
    render(){
        var placeholderMessage = "[Not specified, contact seller]";

        var postImages = this.props.images;
        var postImagesHTML = [];

        if (postImages){
            var numToWord = [
                '#one!','#two!','#three!','#four!','#five!',
                '#six!','#seven!','#eight!','#nine!','#ten!',
                '#eleven!','#twelve!','#thirteen!','#fourteen!','#fifteen!',
                '#sixteen!','#seventeen!','#eighteen!','#nineteen!','#twenty!'];

            for (var i=0; i<postImages.length; i++){
                postImagesHTML.push(
                    <a className="carousel-item" href={numToWord[i]}><img src={postImages[i]} /></a>);
            }
        }
        else{
            postImagesHTML.push(<a className="carousel-item" href="#one!"><img src="https://unsplash.it/500/250/?image=0&blur" /></a>);
            postImagesHTML.push(<a className="carousel-item" href="#one!"><img src="https://unsplash.it/500/250/?image=0&blur" /></a>);
            postImagesHTML.push(<a className="carousel-item" href="#one!"><img src="https://unsplash.it/500/250/?image=0&blur" /></a>);
        }

        return(
            <div id={this.props.modalID} className="modal postModal">
                <div className="modal-content">
                    <div className="row">
                        <div className="col s6 postImagesSlideshow">
                            <div className="carousel" data-indicators="true">
                                {postImagesHTML}
                            </div>
                        </div>
                        <div className="col s6">
                            <PostContact ownerId={this.props.ownerId}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <h5 className="center">{this.props.title}</h5>
                            <strong>{this.props.price || placeholderMessage}</strong>
                            <Map address={this.props.address}/>
                            <i className="tiny material-icons">location_on</i><strong>{this.props.address || placeholderMessage}</strong>
                        </div>
                        <div className="col s6">
                            <h5>Description</h5>
                            <div className="col s9 left-align">{this.props.description || placeholderMessage}</div>
                            <br />
                            <strong>Next post ID: {this.props.nextPostId}</strong>
                            <br />
                            <strong>this.props.modalID: {this.props.modalID}</strong>
                            <br />
                            <strong>this.props.email: {this.props.email}</strong>
                        </div>
                    </div>                    
                    <div className="row modal-footer">                        
                        <div className="col s12 m4 l2">
                            {/* <p>s12 m4</p> */}
                            <button className="btn-floating btn waves-effect waves-light blue" onClick={(e)=>(this.prevPost(e))}>
                                <i className="material-icons">chevron_left</i>
                            </button>
                        </div>
                        <div className="col s12 m4 l8">
                            {/* <p>s12 m4</p> */}
                            <p><Link to={"/user-posts/"+this.props.ownerId}>View this user's others posts</Link></p>
                        </div>
                        <div className="col s12 m4 l2">
                            <button className="btn-floating btn waves-effect waves-light blue" onClick={(e)=>(this.nextPost(e))}>
                                <i className="material-icons">chevron_right</i>
                            </button>    
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default PostModal;