import React from 'react';

class LoginWindow extends React.Component{
    render(){
        return(
            <div>
                <div id="loginModal" className="modal">
                    <a className="modal-action modal-close btn-large modalButtonClose">x</a>
                    <div className="modal-content">
                         <div className="row">
                            <form className="col s12 center" method="post" action="/login">
                                <h5>Login</h5>
                                <div className="row center">
                                    <div className="input-field col s12">
                                        <input id="email" type="email" className="validate" />
                                        <label htmlFor="email" data-error="wrong" data-success="right">Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col l6">
                                        <input id="password" type="password" className="validate" />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <a className="waves-effect waves-light btn-large" type="submit">Login</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default LoginWindow;