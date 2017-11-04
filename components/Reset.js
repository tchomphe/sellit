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
        $('.modal').modal();
        $('.tooltipped').tooltip({delay: 50});
    }

    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
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
            $("#resetContainer #confirmPassword").removeClass("valid").addClass("invalid");
        }
    }

    render(){
        return(
            <div className="col s12 m7 center">
                <div className="card large">
                    <div id="resetContainer" className="container">
                        <div className="card-content left-align">
                            <form className="col s12" onSubmit={e => this.onSubmit(e)} >
                                <span className="card-title">Reset your password</span>
                                <p>Enter your new password:</p>
                                <InputField labelText="Enter new password"
                                    id="password" type="password" onChange={this.handleInputChange} required="" aria-required="true" />
                                <InputField labelText="Re-enter new password" labelSuccess="" labelError={(this.state.err)?this.state.err:"Password do not match!"}
                                    id="confirmPassword" type="password" onChange={this.handleInputChange} required="" aria-required="true" />
                                <div className="card-action right-align">
                                    <button className="btn black" type="submit">Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default withRouter(Reset);