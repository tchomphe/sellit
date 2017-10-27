import React from 'react';
import Request from 'superagent';
import { Link, withRouter } from 'react-router-dom';
import InputField from './InputField';

class Reset extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            err: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        $('.tooltipped').tooltip({delay: 50});        
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
                    this.setState({err: res.body.error});
                } else {
                    Materialize.toast('Your password has been reset!', 4000);
                    
                }
            });            
        } else {
            alert(`Password don't match`);
            return;
        }        
    }

    render(){        
        return(
            <div className="col s12 m7 center">
                <div className="card large">
                    <span className="card-title">Reset your password</span>
                    <div className="card-content left-align">
                        <form className="col s12" onSubmit={e => this.onSubmit(e)} >                    
                            <label>New password: <input name="password" type="password" ref="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Enter your new password"/></label>
                            <label>Confirm new password: <input name="confirmPassword" type="password" ref="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} placeholder="Confirm your new password"/></label>
                            <div className="card-action right-align">
                                <button className = "btn blue waves-effect waves-light" type="submit"> Reset </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
export default withRouter(Reset);