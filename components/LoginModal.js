import React from 'react';

class LoginWindow extends React.Component{
    render(){
        return(
            <div id="loginModal" className="modal">
                <a className="modal-action modal-close btn-large modalButtonClose">x</a>
                <div className="modal-content">
                    <h5>Login</h5>
                    <form className="row center" method="post" action="/login">
                        <div className="input-field col s12">
                            <input id="email" type="email" name="email" className="validate" />
                            <label htmlFor="email" data-error="wrong" data-success="right">Email</label>
                        </div>
                        <div className="input-field col l12">
                            <input id="password" type="password" name="password" className="validate" />
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
export default LoginWindow;