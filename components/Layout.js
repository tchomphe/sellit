import React from 'react';

export default class Layout extends React.Component {
    render(){
        return(
            <div className="app-layout container">
                <div className="app-content row center">{this.props.children}</div>
            </div>
        );
    }
}