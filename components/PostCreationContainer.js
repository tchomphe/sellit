import React from 'react';
import Request from 'superagent';

class PostCreationContainer extends React.Component{
    render(){
        return(
            <div className="row center">
                <h1>Create Post</h1>
                <form className="col s12 center" method="post" action="/createPost">
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input id="title" name="title" type="text" className="validate" />
                            <label htmlFor="title" data-error="wrong" data-success="right">* Title</label>
                        </div>

                        <div className="input-field col s12 m6">
                            <select name="type">
                                <option value="Phone" defaultValue>Phone</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Case">Case</option>
                            </select>
                            <label>* Type</label>
                        </div>

                        <div className="input-field col s12 m6">
                            <input id="price" name="price" type="text" className="validate" />
                            <label htmlFor="price" data-error="wrong" data-success="right">Price</label>
                        </div>

                        <div className="input-field col s12 m6">
                            <input id="address" name="address" type="text" className="validate" />
                            <label htmlFor="address" data-error="wrong" data-success="right">* Address</label>
                        </div>

                        <div className="input-field col s12">
                            <textarea id="description" name="description" className="materialize-textarea"></textarea>
                            <label htmlFor="description">Description</label>
                        </div>

                        {/* TODO: Fix attachments section */}
                        {/* <div className="file-field input-field">
                            <div className="btn">
                                <span>Pictures</span>
                                <input type="file" />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div> */}

                        <button className="btn-large waves-effect waves-light" type="submit" name="action">Create Post
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        )
    }

}
export default PostCreationContainer;