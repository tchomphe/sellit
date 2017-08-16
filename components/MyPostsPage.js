import React from 'react';
import PostModal from './PostModal';
import FloatingBackButton from './FloatingBackButton';
import InteractivePostTile from './InteractivePostTile';
import Request from 'superagent';

export default class MyPostPage extends React.Component {
    constructor(props){
        super(props);

        //define state variables
        this.state = {
            postModal: <PostModal title="TEST title" price="TEST price" address="TEST address" description="TEST description" />,
            displayedPosts: null,
        };
    }

    componentWillMount(){
        Request.get('/searchByOwner').then((res) => {
            console.log(res.body);
            var userPosts = res.body.map((post) =>
                <InteractivePostTile updatePostModal={this.updatePostModal} post={post} key={post._id} id={post._id} title={post.title} address={post.address} />
            );

            this.setState({
                displayedPosts: userPosts,
            });
        });
    }

    render(){
        return (
            <div className="app-content row center">
                <h4 className="profilePageHeader">My Posts</h4>
                {this.state.displayedPosts}
                <FloatingBackButton />
                {this.state.postModal}
            </div>
        )
    }
}