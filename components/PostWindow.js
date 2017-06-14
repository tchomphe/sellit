import React from 'react';


class PostWindow extends React.Component{
    render(){
        return(
            <div>
                <div id="postModal" className="modal">
                    <div className="modal-content">
                        <div className="row">
                            <div className="col s12 postImagesSlideshow"></div>
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
                            <div className="col m4 postContact"></div>
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