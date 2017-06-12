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
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                    </div>
                    <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavigationWindow;