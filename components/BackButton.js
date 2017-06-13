import React from 'react';

export default class BackButton extends React.Component {
    render(){
        return(
            <div>                
                <a className="btn-floating btn-large waves-effect waves-light red">
                    <img src="../assets/icons/back.svg" />
                </a>
            </div>
        );
    }
}