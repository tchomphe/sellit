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
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    handleUserChange(event){
        this.setState({email: event.target.value});
        // this.setState({password: event.target.value});
    }
    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        Request
            .post('/login')
            .send({email: this.state.email, password: this.state.password})
            .end((err, res) => {
                if(err){
                    this.setState({err: res.body.error});
                    // alert(JSON.stringify(this.state.err));

                } else {
                    this.setState({err: ""});
                    $('#userLoginModal').modal('close');

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
    }
    render(){
        return(
            <div id="userLoginModal" className="modal">
                <a className="modal-action modal-close btn-large modalButtonClose">x</a>
                <div className="modal-content">
                    <h5>Login</h5>
                    <div className="card-content red-text">
                        {this.state.err}
                    </div>
                    <form className="row center" onSubmit={this.handleSubmit}>
                        <InputField labelText="Email" labelSuccess="right" labelError="wrong"
                            id="email" type="email" onChange={this.handleUserChange} />
                        <InputField labelText="Password"
                            id="password" type="password" onChange={this.handlePasswordChange} />
                        <button className="btn-large waves-effect waves-light" type="submit" name="action">Login
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                    <Link to="/forgot">Forgot Password</Link>                    
                </div>
            </div>
        )
    }
}
export default UserLoginModal;