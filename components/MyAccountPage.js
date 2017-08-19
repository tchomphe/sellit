import React from 'react';
import InputField from './InputField';
import PropTypes from 'prop-types';
import Request from 'superagent';

export default class MyAccountPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            err: "",
            email: "",
            password: "",
            newPassword: "",
            confirmNewPassword: "",
            nickname: "",
            phone: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event){
        event.preventDefault();

        if (this.state.newPassword == this.state.confirmNewPassword){
            Request
                .put('/user')
                .send({
                    email: this.state.email,
                    password: this.state.password,
                    newPassword: this.state.newPassword,
                    nickname: this.state.nickname,
                    phone: this.state.phone,})
                .end((err, res) => {
                    if(err){
                        this.setState({err: res.body.error});
                        // alert(JSON.stringify(this.state.err));
                    } else {
                        //reset error
                        this.setState({err: ""});
                        //display success message
                        Materialize.toast('Account information updated!', 4000);
                    }
                });
        }
        else
            Materialize.toast('Passwords do not match!', 4000);
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <h5 className="profilePageHeader"><b>My Account</b> - update your information</h5>
                    <div className="col s6">
                        <div className="card-panel">
                            <h6><b>Account Details</b></h6><br />
                            <div className="card-content red-text">
                                {this.state.err}
                            </div>
                            <form method="post" onSubmit={this.handleSubmit} >
                                <div class="row">
                                    <InputField labelText="Nickname (optional):" id="nickname" placeholder={this.props.user.nickname} onChange={this.handleInputChange} />
                                    <InputField labelText="Email:" id="email" type="email" placeholder={this.props.user.email} onChange={this.handleInputChange} />
                                    <InputField labelText="Phone Number (optional):" id="phone" placeholder={this.props.user.phone} onChange={this.handleInputChange} />
                                    <InputField labelText="New Password:" fieldClass="col s6" id="newPassword" type="password" onChange={this.handleInputChange} />
                                    <InputField labelText="Confirm New Password:" fieldClass="col s6" id="confirmNewPassword" type="password" onChange={this.handleInputChange} />
                                    <InputField labelText="*Password:" id="password" type="password" onChange={this.handleInputChange} />
                                    <button className="btn waves-effect waves-light" type="submit" name="action">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col s6">
                        <div className="card-panel">
                            <h6><b>Account Summary</b></h6>
                            <table>
                                <tbody>
                                <tr><td>Email:</td></tr>
                                <tr><td><i>{this.props.user.email}</i></td></tr>
                                <tr><td>Nickname:</td></tr>
                                <tr><td><i>{this.props.user.nickname}</i></td></tr>
                                <tr><td>Phone Number:</td></tr>
                                <tr><td><i>{this.props.user.phone}</i></td></tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MyAccountPage.propTypes = {
    user: PropTypes.object.isRequired,
}