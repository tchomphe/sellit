import React from 'react';
import PostContact from './PostContact';
import Map from './Map'
import { Link, withRouter } from 'react-router-dom';

class PostModal extends React.Component{
    constructor(props){
        super(props);
        this.nextPost = this.nextPost.bind(this);
        this.prevPost = this.prevPost.bind(this);
        // this.onKeyDown = this.onKeyDown.bind(this);
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
    // onKeyDown(e){
    //     if(e.keyCode === 39){
    //         this.nextPost(e);
    //     }
    // }
    componentDidMount(){
        // $("body").keydown(function(e) {
        //     if(e.keyCode == 37) { // left
        //         console.log("Left key pressed!");
        //         // this.prevPost(e);
        //         // alert('Left');
        //     }
        //     else if(e.keyCode == 39) { // right
        //         console.log("Right key pressed!");

        //         // $('#'+this.state.modalID).modal('close')
        //         // this.nextPost(e);
        //         // alert('Right');
        //       };
        //   });
    }
    render(){
        var placeholderMessage = "[Not specified, contact seller]";

        var postImages = this.props.images;
        var postImagesHTML = [];

        if (postImages.length > 0){
            var numToWord = [
                '#one!','#two!','#three!','#four!','#five!',
                '#six!','#seven!','#eight!','#nine!','#ten!',
                '#eleven!','#twelve!','#thirteen!','#fourteen!','#fifteen!',
                '#sixteen!','#seventeen!','#eighteen!','#nineteen!','#twenty!'];

            for (var i=0; i<postImages.length; i++){
                postImagesHTML.push(
                    <a className="carousel-item" href={numToWord[i]}><img className="carousel-image" src={postImages[i]} /></a>);
            }
        }
        else{
            postImagesHTML.push(<a className="carousel-item" href="#one!"><img src="https://unsplash.it/500/250/?image=0&blur" /></a>);
        }

        return(
            // <div id={this.props.modalID} tabIndex="0" className="modal postModal" onKeyDown={this.onKeyDown}>
            <div id={this.props.modalID} className="modal postModal">
                <div className="modal-content">
                    <div className="row">
                        <div className="col s12 m7 l7 postImagesSlideshow">
                            <div className="carousel" data-indicators="true">
                                {postImagesHTML}
                            </div>
                        </div>
                        <div className="col s12 m5 l5 left-align" style={{padding: '20px 40px 0px 40px'}}>
                            <h5>{this.props.title}</h5>
                            <p><Link to={"/user-posts/"+this.props.ownerId}>View others posts by this user</Link></p>
                            <div className="divider"></div>
                            <p><strong>${this.props.price || placeholderMessage}</strong></p>
                            <p>{this.props.description || placeholderMessage}</p>
                            <p>{this.props.address || placeholderMessage}</p>
                            <p><strong>{this.props.phone}</strong></p>
                            <Map address={this.props.address}/>
                            <PostContact ownerId={this.props.ownerId} id={this.props.modalID} />
                        </div>
                    </div>
                    {/* <div className="row">
                        <button className="btn-floating black post-modal-arrow-left" onClick={(e)=>(this.prevPost(e))}>
                            <i className="material-icons">chevron_left</i>
                            <span className="prev-item-mobile-only">Previous item</span>
                        </button>
                        <button className="btn-floating black post-modal-arrow-right" onClick={(e)=>(this.nextPost(e))}>
                            <span className="next-item-mobile-only">Next item</span>
                            <i className="material-icons">chevron_right</i>
                        </button>
                    </div> */}
                </div>
                <a className="modal-action modal-close postModalButtonClose"><i className="material-icons">close</i></a>
            </div>
        );
    }
}

export default PostModal;