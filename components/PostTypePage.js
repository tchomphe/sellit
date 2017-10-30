import React from 'react';
import Request from 'superagent';
import PostModal from './PostModal';
import PostTile from './PostTile';
import { Link, withRouter } from 'react-router-dom';

class PostTypePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            postTiles: [],
            category: ""
        }
    }
    componentDidMount(){
        // Initiate Materialize Modal
        $('.modal').modal();

        // Populate PostTile's with current user's posts
        this.requestUserPosts();
    }
    componentWillReceiveProps(nextProps){
            console.log(`Recieved props! nextProps: ${nextProps.match.params.type}`);
            this.requestUserPosts(nextProps);
    }

    requestUserPosts(nextProps){
        // Since componentWillReceiveProps don't run on first render, setting the url default to this.props.match.params.type. Else
        // use the props received. This also avoids double clicking category link to render.
        var url = (nextProps) ? nextProps.match.params.type : this.props.match.params.type;
        Request.get('/posts/' + url).then((res) => {
            var userPosts = res.body.map((post,index) =>
                <PostTile
                    nextPostId={(index+1)}
                    prevPostId={(index-1)}
                    key={index}
                    postModalID={'postModal'+index}
                    post={post} />
                );

            this.setState({
                postTiles: userPosts,
                category: this.props.match.params.type
            }, () => {console.log('setState executed!')});
        });
    }

    render(){
        console.log('UserPostPage rendering ...');
        return(
            <div className="app-content row center">
                <h4 className="profilePageHeader">{this.state.category}</h4>
                <div className="cards-container">
                    {this.state.postTiles}
                </div>
                <p>this.props.params.type: {this.props.match.params.type}</p>
            </div>
        )
    }
}

export default PostTypePage;
