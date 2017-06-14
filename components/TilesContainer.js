import React from 'react';
import Tile from './Tile';
import NavigationWindow from './NavigationWindow';
import RegistrationWindow from './RegistrationWindow';
import FloatingMenuButton from './FloatingMenuButton';
import FloatingBackButton from './FloatingBackButton';
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
            <div className="col s12">
                {this.state.recentPosts}
                <FloatingMenuButton />
                <FloatingBackButton />
                <NavigationWindow />
                <RegistrationWindow />
            </div>
        );
    }
}