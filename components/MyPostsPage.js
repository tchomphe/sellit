import React from 'react';
//----REMOVE----> import PostEditModal from './PostEditModal';
import FloatingBackButton from './FloatingBackButton';
import InteractivePostTile from './InteractivePostTile';
import Request from 'superagent';
import { withRouter } from 'react-router-dom';

class MyPostPage extends React.Component {
    constructor(props){
        super(props);

        //define state variables
        this.state = {
            //----REMOVE----> postEditModal: <PostEditModal post="" />, //TODO: move PostEditModal inside InteractivePostTile
            postTiles: null,
            err: "",
        };

        this.requestUserPosts = this.requestUserPosts.bind(this);
        //----REMOVE----> this.updatePostEditModal = this.updatePostEditModal.bind(this);
        this.openPostEditContainer = this.openPostEditContainer.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        // Initiate Materialize Modal
        $('.modal').modal();

        // Set up click handler for floating back button
        $('.floatingBackButton').click(function(){
            $('.floatingBackButton').addClass('hide');
            $('.modal').modal('close');
        });

        // Populate PostTile's with current user's posts
        this.requestUserPosts();
    }

    requestUserPosts(){
        Request.get('/postsByOwner').then((res) => {
            var userPosts = res.body.map((currentPost, index) =>
                <InteractivePostTile
                    nextPostId={(index+1)}
                    prevPostId={(index-1)}
                    key={index}
                    deletePost={this.handleDelete}
                    openPostEditContainer={this.openPostEditContainer}
                    postModalID={'postModal'+index}
                    post={currentPost} />
            );

            this.setState({
                postTiles: userPosts,
                err: "",
            });
        });
    }

    //----REMOVE----> updatePostEditModal(post){
    //     //pass information about the (user-selected) post to the modal
    //     this.setState({
    //         postEditModal: <PostEditModal post={post} rerenderMyPostsPage={this.requestUserPosts} />
    //     });

    //     //display the modal on the screen
    //     $('#postEditModal').modal('open');
    // }
    openPostEditContainer(post){
        this.props.history.push('/edit-post/' + post._id);
    }

    handleDelete(post){
        console.log(post._id);
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
                <h4 className="title">My Posts</h4>
                {this.state.postTiles}
                <FloatingBackButton />
                {/*this.state.postEditModal*/}
            </div>
        )
    }
}
export default withRouter(MyPostPage);