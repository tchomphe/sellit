import React from 'react';
import Request from 'superagent';
import PostModal from './PostModal';
import PostTile from './PostTile';
import { Link, withRouter } from 'react-router-dom';

class UserPostPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            postTiles: null
        }
    }
    componentDidMount(){
        // Initiate Materialize Modal
        $('.modal').modal();

        // Populate PostTile's with current user's posts
        this.requestUserPosts();
    }

    requestUserPosts(){
        Request.get('/postsByOwner/' + this.props.match.params.ownerId).then((res) => {
            var userPosts = res.body.map((post,index) =>
                <PostTile
                    nextPostId={(index+1)}
                    prevPostId={(index-1)}
                    key={index}
                    postModalID={'postModal'+index}
                    post={post} />
                );

                this.setState({
                    postTiles: userPosts
                });
        });
    }

    render(){
        console.log('UserPostPage rendering ...');
        return(
            <div className="app-content row center">
                <h4 className="profilePageHeader">All User's Posts</h4>
                <div className="cards-container">
                    {this.state.postTiles}                    
                </div>
                <p>this.props.params.ownerId: {this.props.match.params.ownerId}</p>
            </div>
        )
    }
}

export default UserPostPage;
