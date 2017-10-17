import React from 'react';
import Request from 'superagent';
import PostModal from './PostModal';
import PostTile from './PostTile';
import { Link, withRouter } from 'react-router-dom';

class PostTypePage extends React.Component{    
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
    componentWillReceiveProps(){
        this.requestUserPosts();
    }
    
    requestUserPosts(){        
        Request.get('/posts/' + this.props.match.params.type).then((res) => {
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
                <h4 className="profilePageHeader">All Phones</h4>
                {this.state.postTiles}
                <p>this.props.params.type: {this.props.match.params.type}</p>                
            </div>
        )
    }
}

export default PostTypePage;
