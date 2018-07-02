import React from 'react';
import InputField from './InputField';
import Request from 'superagent';
import { Link, withRouter } from 'react-router-dom';

class UserLoginModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            err: "",
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        // $('.tooltipped').tooltip({delay: 50});
    }

    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    close(){
        event.preventDefault();
        $('#userLoginModal').modal('close');
        this.props.history.push('/forgot');
    }

    handleClick(e){
        e.preventDefault();
        $('#userLoginModal').modal('close');
        $('#userRegistrationModal').modal('open');
    }

    handleSubmit(event){
        event.preventDefault();
        //show page loading wrapper
        $("#dim-page-loader").fadeIn(100);

        if(this.state.email != "" && this.state.password != ""){
            Request
                .post('/login')
                .send({email: this.state.email, password: this.state.password})
                .end((err, res) => {
                    //hide page loading wrapper
                    $("#dim-page-loader").fadeOut(100);

                    //check the server response for an error
                    if(err){
                        this.setState({err: res.body.error});
                        if((res.body.error).includes("Password" || "password")){
                            $("#userLoginModal #password").removeClass("valid").addClass("invalid");
                            $("#userLoginModal #password").val("");
                        } else {
                            $("#userLoginModal #email").removeClass("valid").addClass("invalid");
                            $("#userLoginModal #password").val("");
                        }
                    }
                    else {
                        this.setState({err: ""});
                        $('#userLoginModal').modal('close');

                        Materialize.toast('Log in successful. Welcome amigo!', 4000);

                        //create user object and pass it to prop
                        let userArr = res.header.user.split(', ');
                        let userObj = {
                            email: userArr.shift(),
                            nickname: userArr.shift(),
                            phone: userArr.shift(),
                        }
                        this.props.handleLogin(userObj);
                    }
                });
            }
    }

    render(){
        return(
            <div id="userLoginModal" className="modal">
                <a className="modal-action modal-close modalButtonClose"><i className="material-icons">close</i></a>
                <div className="modal-content">
                    <h5>Sign in</h5>
                    <form className="row" onSubmit={this.handleSubmit}>
                        <InputField labelText="* Email" labelSuccess="" labelError={(this.state.err)?this.state.err:"Enter a valid email address"}
                                id="email" type="email" onChange={this.handleInputChange} required="" aria-required="true" />
                        <InputField labelText="Password" labelSuccess="" labelError={(this.state.err)?this.state.err:"Invalid"}
                            id="password" type="password" onChange={this.handleInputChange} required="" aria-required="true" />
                        <button className="btn black waves-effect waves-light" type="submit" name="action">Sign in</button> &nbsp;
                        <button className="btn black waves-effect waves-light" onClick={e=>this.handleClick(e)}>Sign up</button>
                    </form>
                    <p><Link onClick={this.close} to="/forgot">Forgot Password?</Link></p>
                </div>
            </div>
        );
    }
}

export default withRouter(UserLoginModal);