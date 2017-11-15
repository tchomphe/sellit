import React from 'react';
import Request from 'superagent';
import InputField from './InputField';
import { Link, withRouter } from 'react-router-dom';

class Forgot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            err: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        $('.modal').modal();
        $('.tooltipped').tooltip({delay: 50});

    }

    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        if(this.state.email !== ""){
            Request
                .post('/forgot')
                .send({email: this.state.email})
                .end(function(err, res){
                    if(err) {
                        $('#forgotContainer #email').removeClass("valid").addClass("invalid");
                    } else {
                        $('#forgotContainer #email').val("");
                        Materialize.toast('An email with reset link has been sent!', 4000);
                    }
                });
        } else {
            $('#forgotContainer #email').removeClass("valid").addClass("invalid");
        }
    }
    render(){
        return(
                <div id="forgotContainer" className="col s12 m12 l12">
                    <div className="card large">
                            <div className="card-content left-align">
                            <form onSubmit={(e) => this.onSubmit(e)} >
                                <div className="row" style={{"padding-bottom":"40px"}}>
                                    <span className="card-title">Forgot your password?</span>
                                    <p>We can send you a password reset link </p>
                                </div>
                                <div className="row" style={{"margin-bottom":"120px"}}>
                                    <InputField id="email" type="email" labelText="Enter your email" labelSuccess="" labelError={(this.state.err)?this.state.err:"Enter a valid email address"}
                                        onChange={this.handleInputChange} value={this.state.email} required="" aria-required="true" />
                                </div>
                                <div className="row card-action right-align">
                                    <button className="btn black waves-effect waves-light" type="submit">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}
export default Forgot;