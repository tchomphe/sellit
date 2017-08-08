import React from 'react';

export default class FloatingBackButton extends React.Component {
    render(){
        return(
            <div className="floatingBackButton hide">
                <a className="modal-action modal-close btn-floating btn-large waves-effect waves-light">
                    <i className="large material-icons">arrow_back</i>
                </a>
            </div>
        );
    }
}