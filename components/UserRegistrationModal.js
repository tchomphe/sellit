import React from 'react';
import InputField from './InputField';

class UserRegistrationModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: "",
            password: "",
            nickname: "",
            phone: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }
    componentDidMount(){
        $("#password").on("focusout", function (e) {
            if ($(this).val() != $("#confirm_password").val()) {
                $("#confirm_password").removeClass("valid").addClass("invalid");
            } else {
                $("#confirm_password").removeClass("invalid").addClass("valid");
            }
        });

        $("#confirm_password").on("keyup", function (e) {
            if ($("#password").val() != $(this).val()) {
                $(this).removeClass("valid").addClass("invalid");
            } else {
                $(this).removeClass("invalid").addClass("valid");
            }
        });
    }
    render(){
        console.log("Rendering UserRegistrationModal");
        return(

            <div id="userRegistrationModal" className="modal">
                <a className="modal-action modal-close btn-large modalButtonClose">x</a>
                <div className="modal-content">
                        <div className="row">
                        <h5>Create Account</h5>
                        <form className="col s12 center" method="post" action="/createUser" >
                            <div className="row">
                                <InputField labelText="* Email" labelSuccess="right" labelError="not a valid email address"
                                    id="email" type="email" onChange={this.handleInputChange} required="required" />
                                <InputField fieldClass="col s6" labelText="* Password"
                                    id="password" type="password" onChange={this.handleInputChange} required="required" />
                                <InputField fieldClass="col s6" labelText="* Confirm Password" labelSuccess="match" labelError="mismatch"
                                    id="confirm_password" type="password" required="required" />
                                <InputField labelText="Name/Nickname"
                                    id="nickname" onChange={this.handleInputChange} />
                                <InputField labelText="Phone"
                                    id="phone" onChange={this.handleInputChange} />
                                {/* <input name="phone" type="tel" pattern="^\d{3}\d{3}\d{4}$" className="validate" /> */}
                            </div>
                            <button className="btn-large waves-effect waves-light" type="submit" name="action">Register
                                {/* <i className="material-icons right">send</i> */}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserRegistrationModal;