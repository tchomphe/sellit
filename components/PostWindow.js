import React from 'react';
import FloatingBackButton from './FloatingBackButton';
import PostContact from './PostContact';
import Map from './Map'

class PostWindow extends React.Component{
    render(){
        var placeholderMessage = "[Not specified, contact seller]";
        var initialCenter = { lng: -90.1056957, lat: 29.9717272 }

        return(
            <div>
                <div id="postModal" className="modal">
                    <FloatingBackButton />
                    <div className="modal-content">
                        <div className="row">
                            <div className="col s12 postImagesSlideshow">
                                <div className="carousel" data-indicators="true">
                                    <a className="carousel-item" href="#one!"><img src="http://lorempixel.com/500/250/nature/3" /></a>
                                    <a className="carousel-item" href="#two!"><img src="http://lorempixel.com/500/250/nature/2" /></a>
                                    <a className="carousel-item" href="#three!"><img src="http://lorempixel.com/500/250/nature/7" /></a>
                                    <a className="carousel-item" href="#four!"><img src="http://lorempixel.com/500/250/nature/4" /></a>
                                    <a className="carousel-item" href="#five!"><img src="http://lorempixel.com/500/250/nature/5" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col m8 postInformation">
                                <h5 className="center">{this.props.title}</h5>
                                <br />
                                <div className="row">
                                    <div className="col s3 right-align"><b>Price:</b></div>
                                    <div className="col s9 left-align">{this.props.price || placeholderMessage}</div>
                                    <div className="col s3 right-align"><b>Address:</b></div>
                                    <div className="col s9 left-align">{this.props.address || placeholderMessage}</div>
                                    <div className="col s3 right-align"><b>Description:</b></div>
                                    <div className="col s9 left-align">{this.props.description || placeholderMessage}</div>
                                </div>
                            </div>
                            <div className="col m4 postContact">
                                <PostContact />
                            </div>
                        </div>
                        <div className="row">
                            {/* <div className="col s12 postLocationMap"> */}
                                 <Map initialCenter={initialCenter} /> 
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostWindow;