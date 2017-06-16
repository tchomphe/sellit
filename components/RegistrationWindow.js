import React from 'react';


class RegistrationWindow extends React.Component{
    render(){
        return(
            <div>
                <div id="registerModal" className="modal">
                    <a className="modal-action modal-close btn-large modalButtonClose">x</a>
                    <div className="modal-content">
                         <div className="row">
                            <form className="col s12 center">
                                <h5>Create Account</h5>
                                <div className="row center">
                                    <div className="input-field col s12">
                                        <input id="email" type="email" className="validate" />
                                        <label htmlFor="email" data-error="wrong" data-success="right">* Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col l6">
                                        <input id="password" type="password" className="validate" />
                                        <label htmlFor="password">* Password</label>
                                    </div>
                                    <div className="input-field col l6">
                                        <input id="confirm-password" type="password" className="validate" />
                                        <label htmlFor="confirm-password">* Confirm Password</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col l8 m6">
                                        <input id="nickname" type="text" className="validate" />
                                        <label htmlFor="nickname">Name/Nickname</label>
                                    </div>
                                    <div className="input-field col l4 m6">
                                        <input id="phone" type="text" className="validate" />
                                        <label htmlFor="phone">Phone</label>
                                    </div>
                                </div>
                                <a className="waves-effect waves-light btn-large">Register</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegistrationWindow;