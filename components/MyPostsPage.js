import React from 'react';
import PostModal from './PostModal';
import PostEditModal from './PostEditModal';
import FloatingBackButton from './FloatingBackButton';
import InteractivePostTile from './InteractivePostTile';
import Request from 'superagent';

export default class MyPostPage extends React.Component {
    constructor(props){
        super(props);

        //define state variables
        this.state = {
            postModal: <PostEditModal title="" price="" address="" description="" />,
            displayedPosts: null,
        };

        this.updatePostModal = this.updatePostModal.bind(this);
    }

    componentWillMount(){
        Request.get('/searchByOwner').then((res) => {
            console.log(res.body);
            var userPosts = res.body.map((post) =>
                <InteractivePostTile updatePostModal={this.updatePostModal} post={post} />
            );

            this.setState({
                displayedPosts: userPosts,
            });
        });
    }

    updatePostModal(post){
        //pass information about the (user-selected) post to the modal
        this.setState({
            postModal: <PostEditModal title={post.title} price={post.price} address={post.address} description={post.description} />
        });

        //display the modal on the screen
        $('#postEditModal').modal('open');
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