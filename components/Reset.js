import React from 'react';
import Request from 'superagent';
import { Link, withRouter } from 'react-router-dom';

class Reset extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            password: ""
        }
    }

    onSubmit(e){
        e.preventDefault();        
        const password = this.refs.password.value;
        Request
            .post(`/reset/${this.props.match.params.token}`)
            .send({password: password})
            .end(function(err, res){
                if(err) {
                    alert('Error!');
                } else {
                    alert('Your password has been reset.');                    
                }
            });
    }

    render(){
        return(
            <div>
                <h1>Reset</h1>                     
                <form className="col s12" onSubmit={e => this.onSubmit(e)} >
                    <label>New password: <input name="password" type="password" ref="password" placeholder="Enter your new password"/></label>
                    <label>Confirm new password: <input name="confirm_password" type="password" ref="confirm_password" placeholder="Confirm your new password"/></label>
                    <button className = "btn-large waves-effect waves-light" type="submit"> Reset </button>
                </form>                
            </div>
        )
    }

}
export default withRouter(Reset);