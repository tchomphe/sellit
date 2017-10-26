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
    componentDidMount(){
        // $('.tooltipped').tooltip({delay: 50});        
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
                    // Materialize.toast(`${res.body.error}`, 5000) // 4000 is the duration of the toast                    
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
    close(event){
        event.preventDefault();
        $('#userLoginModal').modal('close');        
    }
    render(){
        return(
            <div id="userLoginModal" className="modal">
                <a className="modal-action modal-close modalButtonClose"><i className="material-icons">close</i></a>
                <div className="modal-content">
                    <h5>Sign in</h5>
                    <div className="card-content red-text">
                        {this.state.err}
                    </div>
                    <form className="row" onSubmit={this.handleSubmit}>
                        <InputField labelText="Email" labelSuccess={(this.state.err != "") ? this.state.err : ""} labelError={(this.state.err != "") ? this.state.err : "Invalid"}
                            id="email" type="email" onChange={this.handleUserChange} />
                        <InputField labelText="Password"
                            id="password" type="password" onChange={this.handlePasswordChange} />                                                
                        <button className="btn blue waves-effect waves-light" type="submit" name="action">Sign in</button>                        
                    </form>
                    <Link to="/forgot">Forgot Password?</Link>                    
                </div>
            </div>
        )
    }
}
export default UserLoginModal;