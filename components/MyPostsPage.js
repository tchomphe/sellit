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
            postEditModal: <PostEditModal post="" />,
            postModal: <PostModal title="" price="" address="" description="" />,
            postTiles: null,
            err: "",
        };

        this.requestUserPosts = this.requestUserPosts.bind(this);
        this.updatePostEditModal = this.updatePostEditModal.bind(this);
        this.updatePostModal = this.updatePostModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        // Initiate Materialize Modal
        $('.modal').modal();
        $('#postModal').modal({
            ready: function(modal, trigger){
                $('.floatingBackButton').removeClass('hide');
                $('.carousel').removeClass('hide');
                $('.carousel').carousel({dist:0,shift:0,padding:0});
            },
            complete: function(modal, trigger){
                $('.floatingBackButton').addClass('hide');
                $('.carousel').addClass('hide');
            }
        });

        // Set up click handler for floating back button
        $('.floatingBackButton').click(function(){
            $('.floatingBackButton').addClass('hide');
            $('.modal').modal('close');
        });

        // Populate PostTile's with current user's posts
        this.requestUserPosts();
    }

    requestUserPosts(){
        Request.get('/searchByOwner').then((res) => {
            var userPosts = res.body.map((post, index) =>
                <InteractivePostTile key={index} handleDelete={this.handleDelete} updatePostEditModal={this.updatePostEditModal} updatePostModal={this.updatePostModal} post={post} />
            );

            this.setState({
                postTiles: userPosts,
                err: "",
            });
        });
    }

    updatePostEditModal(post){
        //pass information about the (user-selected) post to the modal
        this.setState({
            postEditModal: <PostEditModal post={post} />
        });

        //display the modal on the screen
        $('#postEditModal').modal('open');
    }

    updatePostModal(post){
        //pass information about the (user-selected) post to the modal
        this.setState({
            postModal: <PostModal
                title={post.title}
                price={post.price}
                address={post.address}
                description={post.description}
                thumbnail={post.thumbnail}
                images={post.images} />
        });

        //display the modal on the screen
        $('#postModal').modal('open');
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
        console.log('MyPostsPage rendering... ');

        return (
            <div className="app-content row center">
                <h4 className="profilePageHeader">My Posts</h4>
                {this.state.postTiles}
                <FloatingBackButton />
                {this.state.postEditModal}
                {this.state.postModal}
            </div>
        )
    }
}