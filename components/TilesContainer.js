import React from 'react';
import Tile from './Tile';
import NavigationWindow from './NavigationWindow'; 
import Request from 'superagent';

export default class TilesContainer extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            title:[]
        };               
    }
    componentWillMount(){
        Request.get('http://localhost:3000/getPostPage/1').then((res) => {
            this.setState({title: res.body.docs[0].title});
        });
    }
    render(){
        return(
            <div className="col-12">
                <div className="tiles-container card-columns">
                    {this.state.title}
                    <Tile /><Tile /><Tile />
                    <Tile /><Tile /><Tile />
                    <Tile /><Tile /><Tile />
                </div>
                <NavigationWindow />
            </div>
        );
    }
}