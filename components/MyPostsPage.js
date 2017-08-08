import React from 'react';

export default class TilesContainer extends React.Component {
    constructor(props){
        super(props);

        //define state variable holding data for Tiles
        this.state = {
            displayedPosts: [],
        };
    }

    render(){
        return (
            <div className="app-content row center">

            </div>
        )
    }
}