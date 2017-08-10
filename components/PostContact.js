import React from 'react';

class PostContact extends React.Component{
    render(){
        return(            
            <form className="col s12 center">                
                <div className="card-panel">
                <b>Contact Poster</b>
                <div className="row center">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" />
                        <label htmlFor="email" data-error="wrong" data-success="right">* Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
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
                <a href="#" className="waves-effect waves-light btn-large">Send Email</a>
            </div>
            </form>            
        );
    }
}

export default PostContact;