import React from 'react';
import InputField from './InputField';
import PropTypes from 'prop-types';
import Request from 'superagent';

export default class MyAccountPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            err: "",
            email: this.props.user.email,
            nickname: this.props.user.nickname,
            phone: this.props.user.phone,
            password: "",
            newPassword: "",
            confirmNewPassword: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.password !== ""){
            if (this.state.newPassword == this.state.confirmNewPassword){
                Request
                    .put('/user')
                    .send({
                        email: this.state.email,
                        nickname: this.state.nickname,
                        phone: this.state.phone,
                        password: this.state.password,
                        newPassword: this.state.newPassword,})
                    .end((err, res) => {
                        if(err){
                            this.setState({err: res.body.error});
                        } else {
                            //reset error
                            this.setState({err: ""});
                            //display success message
                            Materialize.toast('Account information updated!', 4000);
                        }
                    });
            }
            else {
                Materialize.toast('Passwords do not match!', 4000);
            }
        } else {
            Materialize.toast('Enter password to update!', 4000);
        }
    }
    render(){
        console.log('MyAccountPage rendering... ');

        return(
            <div className="container">
                <div className="row">
                    <h5 className="title"><strong>My account</strong> - update your information</h5>
                    <div className="col s12 m6 l6">
                        <div className="card-panel">
                            <h6><b>Account details</b></h6><br />
                            <div className="card-content red-text">
                                {this.state.err}
                            </div>
                            <form method="post" onSubmit={this.handleSubmit} >
                                <div className="row">
                                    <InputField labelText="Nickname (optional)" id="nickname" value={this.state.nickname} onChange={this.handleInputChange} />
                                    <InputField labelText="Email" id="email" type="email" disabled value={this.state.email} />
                                    <InputField labelText="Phone Number (optional):" id="phone" value={this.state.phone} onChange={this.handleInputChange} />
                                    <InputField labelText="New Password" fieldClass="col s12 m6 l6" id="newPassword" type="password" onChange={this.handleInputChange} />
                                    <InputField labelText="Confirm New Password" fieldClass="col s12 m6 l6" id="confirmNewPassword" type="password" onChange={this.handleInputChange} />
                                    <InputField labelText="* Password" id="password" type="password" onChange={this.handleInputChange} />
                                    <div className="container right-align">
                                    <button className="btn black waves-effect white-text darken-text-2" type="submit" name="action">
                                        Save Changes
                                    </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col s12 m6 l6">
                        <div className="card-panel">
                            <h6><b>Account summary</b></h6>
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