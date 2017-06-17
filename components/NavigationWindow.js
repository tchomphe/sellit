import React from 'react';


class NavigationWindow extends React.Component{
    render(){
        return(
            <div>
                <div id="navigationModal" className="modal">
                    <div className="modal-content">
                        <nav><form>
                            <div className="input-field">
                                <input id="search" type="search" required />
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            </div>
                        </form></nav>
                        <br />
                        <a href="#loginModal" className="waves-effect waves-light btn-large login-button">login to post</a>
                        <a href="#registerModal" className="waves-effect waves-light btn-large login-button">(or create an account)</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavigationWindow;