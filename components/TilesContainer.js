import React from 'react';
import Tile from './Tile';

export default class TilesContainer extends React.Component {
    render(){
        return(
            <div className="col-12">
                <div className="tiles-container card-columns">
                    <Tile /><Tile /><Tile />
                    <Tile /><Tile /><Tile />
                    <Tile /><Tile /><Tile />
                </div>
            </div>
        );
    }
}