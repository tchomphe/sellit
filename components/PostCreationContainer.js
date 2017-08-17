import React from 'react';
import Request from 'superagent';

class PostCreationContainer extends React.Component{
    render(){
        return(
            <div className="contatiner">
                <h6 className="profilePageHeader">Create-Post</h6>                            
                <form method="post" action="/createPost" encType="multipart/form-data">
                <div className="row">
                    <div className="col s6">
                        <label>Title</label>
                        <input type="text" name="title" />
                    </div>
                    <div className="col s6">
                        <label>Address</label>
                        <input type="text" name="address" />
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <label>* Type</label>
                        <select name="type">
                            <option value="Phone" defaultValue>Phone</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Case">Case</option>
                            <option value="Other">Other</option>
                        </select>                        
                    </div>
                    <div className="col s6">
                        <label>Price</label>
                        <input type="text" name="price" />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <label>Description</label>
                        <input type="text" name="description" />
                    </div>
                </div>
                <div className="row">                    
                    <div className="col s12 file-field input-field">
                        <div className="btn">
                            <span>Browse</span>
                            <input type="file" name="postImages" multiple/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Upload multiple files" />
                        </div>
                    </div>                        
                </div>            
                <div className="row center">
                    <div className="s12">                
                        <button className="btn waves-effect waves-light" type="submit" name="action">Create</button>
                    </div>
                </div>            
                </form>                
            </div>
        )
    }

}
export default PostCreationContainer;