import React from 'react';
import Request from 'superagent';
import PostModal from './PostModal';
import PostTile from './PostTile';
import { Link, withRouter } from 'react-router-dom';

class UserPostPage extends React.Component{    
    constructor(props){
        super(props);
        this.state = {
            email: null,
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
        // Request.get('/searchByOwnerEmail/' + this.props.email).then((res) => {
        Request.get('/searchByOwnerEmail/tashi.chomphel@gmail.com').then((res) => {
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
                {this.state.postTiles}
                {/* <p>this.props.params.email: {this.props.match.params.email}</p> */}                
            </div>
        )
    }
}

export default UserPostPage;
