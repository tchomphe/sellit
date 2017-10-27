import React from 'react';
import InputField from './InputField';
import Request from 'superagent';

class UserRegistrationModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            confirm_password: "",
            nickname: "",
            phone: "",
            err: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        $("#userRegistrationModal #password").on("focusout", function (e) {
            if ($(this).val() != $("#userRegistrationModal #confirm_password").val()) {
            $("#userRegistrationModal #confirm_password").removeClass("valid").addClass("invalid");
            } else {
                $("#userRegistrationModal #confirm_password").removeClass("invalid").addClass("valid");
            }
        });

        $("#userRegistrationModal #confirm_password").on("keyup", function (e) {
            if ($("#userRegistrationModal #password").val() != $(this).val()) {
                $(this).removeClass("valid").addClass("invalid");
            } else {
                $(this).removeClass("invalid").addClass("valid");
            }
        });
    }
    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.password === this.state.confirm_password){
            Request
                .post('/createUser')
                .send({
                    email: this.state.email,
                    password: this.state.password,
                    nickname: this.state.nickname,
                    phone: this.state.phone })
                .end((err, res) => {
                    if(err){
                        this.setState({err: res.body.msg});
                        $("#userRegistrationModal #email").removeClass("valid").addClass("invalid");

                    } else {
                        this.setState({err: ""});
                        $('#userRegistrationModal').modal('close');

                        //create user object and pass it to prop
                        let userArr = res.header.user.split(', ');
                        let userObj = {
                            email: userArr.shift(),
                            nickname: userArr.shift(),
                            phone: userArr.shift(),
                        };
                        this.props.handleLogin(userObj);
                    }
                });
        } else {
            $("#userRegistrationModal #password").removeClass("valid").addClass("invalid");            
            $("#userRegistrationModal #confirm_password").removeClass("valid").addClass("invalid");            
        }
    }
    render(){
        return(
            <div id="userRegistrationModal" className="modal">
                <a className="modal-action modal-close modalButtonClose"><i className="material-icons">close</i></a>
                <div className="modal-content">                    
                    <h5>Sign up</h5>                    
                    <form className="col s12" onSubmit={this.handleSubmit} >
                        <div className="row">
                            <InputField labelText="* Email" labelSuccess="" labelError={(this.state.err)?this.state.err:"Enter a valid email address"}
                                id="email" type="email" onChange={this.handleInputChange} required="required" />

                            <InputField fieldClass="col s6" labelText="* Password"
                                id="password" type="password" className="validate" onChange={this.handleInputChange} required="required" />
                            
                            <InputField fieldClass="col s6" labelText="* Confirm Password" labelSuccess="" labelError="mismatch"
                                id="confirm_password" type="password" onChange={this.handleInputChange} required="required" />
                            
                            <InputField labelText="Name/Nickname"
                                id="nickname" onChange={this.handleInputChange} />
                            
                            <InputField labelText="Phone"
                                id="phone" onChange={this.handleInputChange} />
                            {/* <input name="phone" type="tel" pattern="^\d{3}\d{3}\d{4}$" className="validate" /> */}
                        </div>
                        <div className="row">                            
                            <button className="btn blue waves-effect waves-light" type="submit" name="action">Register</button>
                        </div>
                    </form>
                </div>
                </div>            
        );
    }
}

export default UserRegistrationModal;