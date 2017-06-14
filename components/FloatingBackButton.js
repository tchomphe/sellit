import React from 'react';

export default class FloatingBackButton extends React.Component {
    render(){
        return(
            <div className="floatingBackButton">
                <a className="btn-floating btn-large waves-effect waves-light red">
                    <img src="../assets/icons/back.svg" />
                </a>
            </div>
        );
    }
}