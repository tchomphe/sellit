import React from 'react';
import Request from 'superagent';
import { Link, withRouter } from 'react-router-dom';

class Forgot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: ""
        }
    }
    onSubmit(e){
        e.preventDefault();        
        const username = this.refs.username.value;
        Request
            .post('/forgot')
            .send({email: username})
            .end(function(err, res){
                if(err) {
                    alert('Error!');
                } else {
                    alert(`An email reset link has been sent to ${username}.`);                    
                }
            });
    }
    render(){        
        return(
            // <div className="col s6">
                <div className="card-panel" style={{width: '50%'}}>
                    <div className = "row">
                        <form onSubmit={(e) => this.onSubmit(e)} >                    
                            <label>Email: <input name="username" type="text" ref="username" placeholder="Enter your username"/></label>
                            <button className="btn blue waves-effect waves-light" type="submit">Send confirmation</button>
                        </form>                
                    </div>
                </div>
            // </div>
        )
    }
}
export default Forgot;