import React from 'react';

class PostCreationContainer extends React.Component{
    render(){
        return(
            <div className="row">
                <form className="col s12 center">
                    <h1>Create Post</h1>
                        <div className="row center">
                            <div className="input-field col s12">
                                <input id="title" type="text" className="validate" />
                                <label htmlFor="title" data-error="wrong" data-success="right">* Title</label>
                            </div>
                        </div>
                        <div className="row center">
                            <div className="input-field col s12">
                                <select>
                                <option value="" disabled selected>Category</option>
                                <option value="1">Phone</option>
                                <option value="2">Laptop</option>
                                <option value="3">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="row center">
                            <div className="input-field col s12">
                                <input id="price" type="text" className="validate" />
                                <label htmlFor="price" data-error="wrong" data-success="right">* Price</label>
                            </div>
                        </div>

                        <div className="row center">
                            <div className="input-field col s12">
                                <textarea id="description" className="materialize-textarea"></textarea>
                                <label htmlFor="description">Description</label>
                            </div>
                        </div>

                        <div className="row center">
                            <div className="input-field col s12">
                                <input id="address" type="text" className="validate" />
                                <label htmlFor="address" data-error="wrong" data-success="right">* Address</label>
                            </div>
                        </div>
                        <div className="row center">
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Pictures</span>
                                    <input type="file" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>
                        </div>
                        <a className="waves-effect waves-light btn-large">Create Post</a>
                    </form>
            </div>
        )
    }

}
export default PostCreationContainer;