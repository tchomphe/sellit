import React from 'react';
import Request from 'superagent';
import { Link, withRouter } from 'react-router-dom';
import InputField from './InputField';

class Reset extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            password: "",
            confirmPassword: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    onSubmit(e){
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword){
        Request
            .post(`/reset/${this.props.match.params.token}`)
            .send({password: this.state.password})
            .end(function(err, res){
                if(err) {
                    alert('Error!');
                } else {
                    alert('Your password has been reset.');                    
                }
            });            
        } else {
            alert(`Password don't match`);
            return;
        }        
    }

    render(){        
        return(
            <div>
                <h1>Reset</h1>                     
                <form className="col s12" onSubmit={e => this.onSubmit(e)} >                    
                    <label>New password: <input name="password" type="password" ref="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Enter your new password"/></label>
                    <label>Confirm new password: <input name="confirmPassword" type="password" ref="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} placeholder="Confirm your new password"/></label>
                    <button className = "btn-large waves-effect waves-light" type="submit"> Reset </button>
                </form>                
            </div>
        )
    }

}
export default withRouter(Reset);