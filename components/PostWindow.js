import React from 'react';
import FloatingBackButton from './FloatingBackButton';
import PostContact from './PostContact';

class PostWindow extends React.Component{
    render(){
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
                                <h5 className="center">Post Title</h5>
                                <br />
                                <div className="row">
                                    <div className="col s3 right-align"><b>Price:</b></div>
                                    <div className="col s9 left-align">[price goes here]</div>
                                    <div className="col s3 right-align"><b>Address:</b></div>
                                    <div className="col s9 left-align">[address goes here]</div>
                                    <div className="col s3 right-align"><b>Description:</b></div>
                                    <div className="col s9 left-align">[description goes here Lorem ipsum dolor sit amet, mea ex partiendo accusamus reprehendunt, vis ei sanctus expetenda suavitate, has id sale oporteat accommodare. Dolor dolorum expetenda id qui.]</div>
                                </div>
                            </div>
                            <div className="col m4 postContact">
                                <PostContact />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 postLocationMap"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostWindow;