import React from 'react';
import InteractivePostTile from './InteractivePostTile';
import Request from 'superagent';
import { withRouter } from 'react-router-dom';
import Masonry from 'react-masonry-component';

class MyPostPage extends React.Component {
    constructor(props){
        super(props);

        //define state variables
        this.state = {
            postTiles: null,
            err: "",
        };

        this.requestUserPosts = this.requestUserPosts.bind(this);
        this.openPostEditContainer = this.openPostEditContainer.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        // Initiate Materialize Modal
        $('.modal').modal();

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

    openPostEditContainer(post){
        this.props.history.push('/edit-post/' + post._id);
    }

    handleDelete(post){
        console.log(post._id);
        //show page loading wrapper
        $("#dim-page-loader").fadeIn(100);

        Request
            .delete('/post/' + post._id)
            .end((err, res)=>{
                //hide page loading wrapper
                $("#dim-page-loader").fadeOut(100);

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
            <div className="container center-align">
                <h5 className="title left-align"><strong>My Listings</strong> - edit or delete your item</h5>
            <div className="row">
                <Masonry
                    className={'my-gallery-class'} // default ''
                    elementType={'div'} // default 'div'
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} //
                >
                    {this.state.postTiles}
                </Masonry>
            </div>
        </div>
        );
    }
}

export default withRouter(MyPostPage);