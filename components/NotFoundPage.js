import React from 'react';

export default class NotFoundPage extends React.Component{
    render(){
        console.log('NotFoundPage rendering... ');
        return(
            <div className="container center">
                <h2>Page Not Found! :(</h2>
                <h5>Please do not freak out. Just go to the main page.</h5>
            </div>
        );
    }
}