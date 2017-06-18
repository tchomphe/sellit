import React from 'react';


class NavigationWindow extends React.Component{
    render(){
        return(
            <div>
                <nav className="left-align">
                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo left">TOlist</a>
                        <form>
                            <div className="input-field">
                                <input id="search" type="search" required />
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            </div>
                        </form>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="#registerModal">Create an Account</a></li>
                            <li>
                                <a href="#loginModal" className="waves-effect waves-light btn">login to post</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavigationWindow;