import React from 'react';
import Request from 'superagent';

class PostCreationContainer extends React.Component{
    render(){
        return(
            // <div className="container">
            //     <h5 className="profilePageHeader">Create Post</h5>
            //     <form className="col s12 center" method="post" action="/createPost" enctype="multipart/form-data">
            //         <div className="row">
            //             <div className="input-field col s12 m6">
            //                 <input id="title" name="title" type="text" className="validate" />
            //                 <label htmlFor="title" data-error="wrong" data-success="right">* Title</label>
            //             </div>

            //             <div className="input-field col s12 m6">
            //                 <select name="type">
            //                     <option value="Phone" defaultValue>Phone</option>
            //                     <option value="Laptop">Laptop</option>
            //                     <option value="Case">Case</option>
            //                     <option value="Other">Other</option>
            //                 </select>
            //                 <label>* Type</label>
            //             </div>

            //             <div className="input-field col s12 m6">
            //                 <input id="price" name="price" type="text" className="validate" />
            //                 <label htmlFor="price" data-error="wrong" data-success="right">Price</label>
            //             </div>

            //             <div className="input-field col s12 m6">
            //                 <input id="address" name="address" type="text" className="validate" />
            //                 <label htmlFor="address" data-error="wrong" data-success="right">* Address</label>
            //             </div>

            //             <div className="input-field col s12">
            //                 <textarea id="description" name="description" className="materialize-textarea"></textarea>
            //                 <label htmlFor="description">Description</label>
            //             </div>
 
            //             <div>
            //             <div className="file-field input-field">
            //                 <div className="btn">
            //                     <span>Browse</span>
            //                     <input type="file" name="postImages" />
            //                 </div>
            //                 <div className="file-path-wrapper">
            //                     <input type="text" className="file-path validate" placeholder="Upload files" />
            //                 </div>
            //             </div>                            
            //             </div>
            //             <button className="btn-large waves-effect waves-light" type="submit" name="action">Create Post
            //                 <i className="material-icons right">send</i>
            //             </button>
            //         </div>
            //     </form>
            // </div>

            <div className="contatiner">
                <h1>create-post</h1>
                <form method="post" action="/createPost" encType="multipart/form-data">                    
                    <input type="text" name="title" />
                    <input type="text" name="address" />
                    <input type="text" name="type" />
                    <input type="file" name="postImages" />
                    <input type="submit" value="Submit" />

                </form>
            </div>
        )
    }

}
export default PostCreationContainer;