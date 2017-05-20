import React from 'react';

class Layout extends React.Component {
    render(){
        return(
            <div className="app-layout container-fluid">
                <div className="app-content">{this.props.children}</div>
            </div>
        );
    }
}

export default Layout;