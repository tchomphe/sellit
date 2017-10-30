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
                        <div className="col s12 m7 l7 postImagesSlideshow">
                            <div className="carousel" data-indicators="true">
                                {postImagesHTML}
                            </div>
                        </div>
                        <div className="col s12 m5 l5 left-align">
                            <h5>{this.props.title}</h5>
                            <div className="divider"></div>
                            <p><strong>${this.props.price || placeholderMessage}</strong></p>
                            <p>{this.props.description || placeholderMessage}</p>
                            <p>{this.props.address || placeholderMessage}</p>
                            <Map address={this.props.address}/>
                            <div className="divider"></div>
                            {/* <h5 className="left-align">Contact</h5> */}
                            <PostContact ownerId={this.props.ownerId}/>                                                                                                                
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col s12 m4 l3">                            
                            <Map address={this.props.address}/>                            
                        </div>                        
                        <div className="col s12 m8 l9 left-align">
                            <h5>{this.props.title}</h5>
                            <div className="divider"></div>
                            <h6>${this.props.price || placeholderMessage}</h6>
                            <p>{this.props.description || placeholderMessage}</p>                            
                        </div>
                    </div> */}
                    <div className="row modal-footer">                        
                        <div className="col s2 m2 l2">
                            {/* <p>s12 m4</p> */}
                            <button className="btn-floating btn waves-effect waves-light blue" onClick={(e)=>(this.prevPost(e))}>
                                <i className="material-icons">chevron_left</i>
                            </button>
                        </div>
                        <div className="col s8 m8 l8">
                            {/* <p>s12 m4</p> */}
                            <p><Link to={"/user-posts/"+this.props.ownerId}>View this user's others posts</Link></p>
                        </div>
                        <div className="col s2 m2 l2">
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