import React from 'react';

export default class FloatingMenuButton extends React.Component {
    render(){
        return(
            <div className="corner-menu">
                <a className="btn-floating btn-large waves-effect waves-light red" href="#navModal">
                    <i className="material-icons">search</i>
                </a>
            </div>
        );
    }
}