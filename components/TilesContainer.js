import React from 'react';
import Tile from './Tile';
import NavigationWindow from './NavigationWindow';
import Request from 'superagent';

export default class TilesContainer extends React.Component {
    constructor(props){
        super(props);

        //define state variable holding data for Tiles
        this.state = {
            recentPosts: [],
        };
    }

    componentWillMount(){
        this.getPosts();
    }

    getPosts(){
        //send GET request to API and update state with response
        Request.get('/paginatePosts/1').then((res) => {
            this.setState({
                recentPosts: res.body.docs.map((post) =>
                    <Tile key={post._id.toString()} title={post.title} address={post.address} />
                ),
            })
        });
    }

    render(){
        return(
            <div className="col-12">
                <div className="tiles-container card-columns">
                    {this.state.recentPosts}
                </div>
                <NavigationWindow />
            </div>
        );
    }
}