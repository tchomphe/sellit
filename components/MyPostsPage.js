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
            postEditModal: <PostEditModal title="" price="" address="" description="" />,
            postModal: <PostModal title="" price="" address="" description="" />,
            displayedPosts: null,
            err: "",
        };

        this.requestUserPosts = this.requestUserPosts.bind(this);
        this.updatePostEditModal = this.updatePostEditModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount(){
        this.requestUserPosts();
    }

    componentDidMount(){
        // Initiate Materialize Modal
        $('.modal').modal();
    }

    requestUserPosts(){
        Request.get('/searchByOwner').then((res) => {
            var userPosts = res.body.map((post) =>
                <InteractivePostTile handleDelete={this.handleDelete} updatePostEditModal={this.updatePostEditModal} updatePostModal={this.updatePostEditModal} post={post} />
            );

            this.setState({
                displayedPosts: userPosts,
                err: "",
            });
        });
    }

    updatePostEditModal(post){
        //pass information about the (user-selected) post to the modal
        this.setState({
            postEditModal: <PostEditModal pid={post._id} title={post.title} price={post.price} address={post.address} description={post.description} />
        });

        //display the modal on the screen
        $('#postEditModal').modal('open');
    }

    handleDelete(post){
        Request
            .delete('/post/' + post._id)
            .end((err, res)=>{
                if(err){
                    this.setState({err: res.body.err});
                }
                else {
                    this.requestUserPosts();
                    Materialize.toast('Delete successful!', 4000)
                }
            });
    }

    render(){
        return (
            <div className="app-content row center">
                <h4 className="profilePageHeader">My Posts</h4>
                {this.state.displayedPosts}
                <FloatingBackButton />
                {this.state.postEditModal}
                {this.state.postModal}
            </div>
        )
    }
}