import React from 'react';
import Request from 'superagent';

class UserPostPage extends React.Component{    
    constructor(props){
        super(props);
        this.state = {
            email: this.props.email,
            postTiles: null
        }
    }

    requestUserPosts(){
        // Request.get('/searchByOwnerEmail/' + this.state.email).then((res) => {
        Request.get('/searchByOwnerEmail/tashi.chomphel@gmail.com').then((res) => {
            var userPosts = req.body.map((post,index) => 
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
                <h4 className="profilePageHeader">User's Posts</h4>
                BODY                
            </div>
        )
    }
}

export default UserPostPage;
