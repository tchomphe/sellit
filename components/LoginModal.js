import React from 'react';
import Request from 'superagent';

class LoginModal extends React.Component{
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
                    $('#loginModal').modal('close');

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
            <div id="loginModal" className="modal">
                <a className="modal-action modal-close btn-large modalButtonClose">x</a>
                <div className="modal-content">
                    <h5>Login</h5>
                    <div className="card-content red-text">
                        {this.state.err}
                    </div>
                    <form className="row center" onSubmit={this.handleSubmit}>
                        <div className="input-field col s12">
                            <input type="email" className="validate" value={this.state.email} onChange={this.handleUserChange} />
                            <label htmlFor="email" data-error="wrong" data-success="right">Email</label>
                        </div>
                        <div className="input-field col l12">
                            <input type="password" className="validate" value={this.state.password} onChange={this.handlePasswordChange} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button className="btn-large waves-effect waves-light" type="submit" name="action">Login
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
export default LoginModal;