import React from 'react';
import PostTile from './PostTile';
import NavigationHeader from './NavigationHeader';
import RegistrationWindow from './RegistrationWindow';
import LoginWindow from './LoginWindow';
import PostWindow from './PostWindow';
import FloatingBackButton from './FloatingBackButton';
import Banner from './Banner';
import Request from 'superagent';

export default class TilesContainer extends React.Component {
    constructor(props){
        super(props);

        //define state variable holding data for Tiles
        this.state = {
            displayedPosts: [],
        };
    }

    componentWillMount(){
        this.getPosts();
    }

    getPosts(){
        //send GET request to API and update state with response
        Request.get('/paginatePosts/1').then((res) => {
            this.setState({
                displayedPosts: res.body.docs.map((post) =>
                    <PostTile key={post._id.toString()} title={post.title} address={post.address} />
                ),
            })
        });
    }

    searchPost(title){
        Request.get('/searchByTitle/' + title).then((res) => {
            this.setState({
                displayedPosts: res.body.docs.map((post) =>
                    <PostTile key={post._id.toString()} title={post.title} address={post.address} />
                ),
            })            
        });
    }

    render(){
        return(
            <div className="app-content row center">
                <NavigationHeader searchPost={this.searchPost.bind(this)}/>
                <Banner />
                {this.state.displayedPosts}
                <RegistrationWindow />
                <LoginWindow />
                <PostWindow />
            </div>
        );
    }
}