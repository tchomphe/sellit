import React from 'react';

export default class FloatingBackButton extends React.Component {
    render(){
        return(
            <div className="floatingBackButton hide">
                <a className="btn-floating btn-large waves-effect waves-light" onClick={this.props.closeModal} >
                    <i className="large material-icons">arrow_back</i>
                </a>
            </div>
        );
    }
}