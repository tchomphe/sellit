import React from 'react';
import CornerMenu from './CornerMenu';


class NavigationWindow extends React.Component{
    render(){
        return(
            <div>
                <CornerMenu />
                <div id="navModal" className="modal">
                    <div className="modal-content">
                        <nav><form>
                            <div className="input-field">
                                <input id="search" type="search" required />
                                <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                            </div>
                        </form></nav>
                        <br />
                        <a className="waves-effect waves-light btn-large login-button">login to post</a>
                    </div>
                </div>

            </div>
        );
    }
}

export default NavigationWindow;