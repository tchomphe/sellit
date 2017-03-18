import React from 'react';

class Layout extends React.Component {
    render(){
        return(
            <div className="app-layout-container">
                <header>
                    <h2>HEADER</h2>
                </header>
                <div className="app-content">app content goes here</div>
                <footer>
                    <h2>FOOTER</h2>
                </footer>
            </div>
        );
    }
}