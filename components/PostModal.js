import React from 'react';
import FloatingBackButton from './FloatingBackButton';
import PostContact from './PostContact';
import Map from './Map'

class PostModal extends React.Component{
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
            <div id="postModal" className="modal">
                <div className="modal-content">
                    <div className="row">
                        <div className="col s12 postImagesSlideshow">
                            <div className="carousel" data-indicators="true">
                                {postImagesHTML}
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col m8 postInformation">
                            <div className="card-panel">
                            <h5 className="center">{this.props.title}</h5>
                            <h6 className="center">ID: {this.props.key}</h6>
                            <br />
                            <div className="row">
                                <div className="col s3 right-align"><b>Price:</b></div>
                                <div className="col s9 left-align">{this.props.price || placeholderMessage}</div>
                                <div className="col s3 right-align"><b>Address:</b></div>
                                <div className="col s9 left-align">{this.props.address || placeholderMessage}</div>
                                <div className="col s3 right-align"><b>Description:</b></div>
                                <div className="col s9 left-align">{this.props.description || placeholderMessage}</div>
                                <div className="col s3 right-align"><b>Owner Email:</b></div>
                                <div className="col s9 left-align">{this.props.email || placeholderMessage}</div>
                            </div>
                        </div>
                        </div>
                        <div className="col m4">
                            <PostContact receiver={this.props.email}/>
                        </div>
                    </div>
                    <div className="row">
                        {/* <div className="col s12 postLocationMap"> */}
                                <Map address={this.props.address}/>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default PostModal;