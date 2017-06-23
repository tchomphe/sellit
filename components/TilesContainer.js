import React from 'react';
import PostTile from './PostTile';
import NavigationHeader from './NavigationHeader';
import RegistrationWindow from './RegistrationWindow';
import LoginWindow from './LoginWindow';
import PostWindow from './PostWindow';
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
                    <PostTile key={post._id.toString()} title={post.title} address={post.address} />
                ),
            })
        });
    }

    render(){
        return(
            <div className="col s12">
                <NavigationHeader />
                {this.state.recentPosts}
                <FloatingMenuButton />
                <RegistrationWindow />
                <LoginWindow />
                <PostWindow />
            </div>
        );
    }
}