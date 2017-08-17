import React from 'react';
import FloatingBackButton from './FloatingBackButton';

class PostEditModal extends React.Component{
    render(){
        var placeholderMessage = "[Not specified, contact seller]";        

        return(
            <div id="postEditModal" className="modal">
                <div className="modal-content">                        
                    <div className="card-panel">

                        <label htmlFor="title">Title:</label>
                        <input placeholder={this.props.title} id="title" type="text" className="validate" />                        
                        
                        <div className="row">
                            <div className="col s3 right-align"><b>Price:</b></div>
                            <div className="col s9 left-align">{this.props.price || placeholderMessage}</div>
                            <div className="col s3 right-align"><b>Address:</b></div>
                            <div className="col s9 left-align">{this.props.address || placeholderMessage}</div>
                            <div className="col s3 right-align"><b>Description:</b></div>
                            <div className="col s9 left-align">{this.props.description || placeholderMessage}</div>
                        </div>
                    </div>                                            
                </div>
            </div>
        );
    }
}

export default PostEditModal;