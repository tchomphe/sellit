import React from 'react';
import Request from 'superagent';
import { Link, withRouter } from 'react-router-dom';

class Forgot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            err: ""
        }
    }
    onSubmit(e){
        e.preventDefault();        
        const email = this.refs.email.value;
        Request
            .post('/forgot')
            .send({email: email})
            .end(function(err, res){
                if(err) {
                    alert('Error!');
                } else {
                    alert(`An email reset link has been sent to ${email}.`);                    
                }
            });
    }
    render(){        
        return(            
                <div className="col s12 m7 center">
                    <div className="card large">
                        <span className="card-title">Forgot your password?</span>
                        <p className="left-align">We can send you a password reset link</p>
                        <div className="card-content left-align">
                            <form onSubmit={(e) => this.onSubmit(e)} >                    
                                <input id="email" name="email" type="text" ref="email" placeholder="Enter your email" required="" aria-required="true" />
                                <div className="card-action right-align">
                                    <button className="btn blue waves-effect waves-light" type="submit">Send</button>
                                    {/* <a href="#">This is a link</a> */}
                                </div>                            
                            </form>                
                        </div>
                    </div>
                </div>        
        )
    }
}
export default Forgot;