import React from 'react';

export default class Layout extends React.Component {
    render(){
        return(
            <div className="tile card">
                <img class="card-img-top" src="https://placehold.it/350x250" alt="Card image cap" />
                <h4 className="card-title">Title: </h4>                
                <p className="card-text">Address:</p>            
            </div>
        )
    }
}