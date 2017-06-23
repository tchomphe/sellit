import React from 'react';


class RegistrationWindow extends React.Component{
    render(){
        return(
            <div>
                <div id="registerModal" className="modal">
                    <a className="modal-action modal-close btn-large modalButtonClose">x</a>
                    <div className="modal-content">
                         <div className="row">
                            <form className="col s12 center" method="post" action="/createUser" >
                                <h5>Create Account</h5>
                                <div className="row center">
                                    <div className="input-field col s12">
                                        <input name ="email" type="email" className="validate" required="required"/>
                                        <label data-error="Not a valid email address">* Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col l6">
                                        <input name="password" type="password" className="validate" />
                                        <label >* Password</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col l8 m6">
                                        <input name="nickname" type="text" className="validate" />
                                        <label>Name/Nickname</label>
                                    </div>
                                    <div className="input-field col l4 m6">
                                        <input name="phone" type="text" className="validate" />
                                        <label>Phone</label>
                                    </div>
                                </div>
                                <button className="btn-large waves-effect waves-light" type="submit" name="action">Register
                                    <i className="material-icons right">send</i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegistrationWindow;