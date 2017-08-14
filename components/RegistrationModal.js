import React from 'react';


class RegistrationModal extends React.Component{
    render(){                
        return(
            <div id="registerModal" className="modal">
                <a className="modal-action modal-close btn-large modalButtonClose">x</a>
                <div className="modal-content">
                        <div className="row">
                        <h5>Create Account</h5>
                        <form className="col s12 center" method="post" action="/createUser" >
                            <div className="row center">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input name ="email" type="email" className="validate" required="required"/>
                                        <label data-error="Not a valid email address">* Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input name="password" ref="password" type="password" className="validate" />
                                        <label >* Password</label>                                        
                                    </div>
                                    <div className="input-field col s6">
                                        <input name="confirm_password" ref="confirm_password" type="password" className="validate" />
                                        <label htmlFor="confirm_password" data-error="wrong" data-success="right">* Confirm Password</label>                                        
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input name="nickname" type="text" className="validate" />
                                        <label>Name/Nickname</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input name="phone" type="tel" pattern="^\d{3}\d{3}\d{4}$" className="validate" />
                                        <label>Phone</label>                                      
                                    </div>
                                </div>
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

export default RegistrationModal;