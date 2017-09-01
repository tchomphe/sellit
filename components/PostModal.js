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
                        <div className="col s6 postImagesSlideshow">
                            <div className="carousel" data-indicators="true">
                                {postImagesHTML}
                            </div>
                        </div>
                        <div className="col s6">
                            <PostContact receiver={this.props.email}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <h5 className="center">{this.props.title}</h5>                            
                            <strong>{this.props.price || placeholderMessage}</strong>
                            <Map address={this.props.address}/>                            
                            <i className="tiny material-icons">location_on</i><strong>{this.props.address || placeholderMessage}</strong>
                        </div>
                        <div className="col s6 postInformation">
                            {/* <div className="card-panel"> */}
                                {/* <h6 className="center">{this.props.title}</h6>
                                <h6 className="center">ID: {this.props.key}</h6> */}
                                <br />
                                <div className="row">
                                    <h5>Description</h5>                                    
                                    <div className="col s9 left-align">{this.props.description || placeholderMessage}</div>                                    
                                </div>
                        {/* </div> */}
                        </div>
                        {/* <div className="col m4">
                            <PostContact receiver={this.props.email}/>
                        </div> */}
                    </div>
                    {/* <div className="row">
                        <div className="col m4 card-panel">                        
                                <Map address={this.props.address}/>                        
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default PostModal;