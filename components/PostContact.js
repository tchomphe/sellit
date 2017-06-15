import React from 'react';

class PostContact extends React.Component{
    render(){
        return(
            <form className="col s12 center">
                <h5>Contact Poster</h5>
                <div className="row center">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" />
                        <label htmlFor="email" data-error="wrong" data-success="right">* Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col l8 m6">
                        <input id="name" type="text" className="validate" />
                        <label htmlFor="name">Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea id="message" className="materialize-textarea"></textarea>
                        <label htmlFor="message">Message</label>
                    </div>
                </div>
                <a className="waves-effect waves-light btn-large">Send Email</a>
            </form>
        );
    }
}

export default PostContact;