import React from 'react';

export default class Layout extends React.Component {
    render(){
        return(
            <div className="app-layout container">
                {this.props.children}
            </div>
        );
    }
}