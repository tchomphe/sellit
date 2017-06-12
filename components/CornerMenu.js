import React from 'react';

export default class CornerMenu extends React.Component {
    render(){
        return(
            <div className="corner-menu">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#navModal">
                    Launch Search bar
                </button>
            </div>
        );
    }
}