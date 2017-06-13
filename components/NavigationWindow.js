import React from 'react';
import CornerMenu from './CornerMenu';


class NavigationWindow extends React.Component{
    render(){
        return(
            <div>
                <CornerMenu />

                {/*<!-- Modal Structure -->*/}
                <div id="navModal" className="modal">
                    <div className="modal-content">
                    <nav>
                        <div className="nav-wrapper">
                        <form>
                            <div className="input-field">
                            <input id="search" type="search" required />
                            <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                            </div>
                        </form>
                        </div>
                    </nav>
                    </div>
                    <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavigationWindow;