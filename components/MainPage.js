import React from 'react';
import Banner from './Banner';
import PostTile from './PostTile';
import PostModal from './PostModal';
import FloatingBackButton from './FloatingBackButton';
import Request from 'superagent';

export default class MainPage extends React.Component {
    constructor(props){
        super(props);

        //define state variable holding data for <PostModal>
        this.state = {
            posts: [],
            page: 1,
            postModal: <PostModal title="" price="" address="" description="" />,
        };

        //bind function to this component
        this.updatePostModal = this.updatePostModal.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
    }

    componentDidMount(){
        //initialize Post Modals
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

        //send request to initialize post listings
        this.requestAllPosts(1);
    }

    requestAllPosts(currentPage){
        Request.get('/paginatePosts/' + currentPage).then((res) => {
            var oldPosts = this.state.posts;
            var newPosts = res.body.docs;
            var updatedPosts = oldPosts.concat(newPosts);

            //determine nextPage, if last page of results were encountered, set nextPage to 0
            var nextPage = (newPosts.length == 0) ? 0 : currentPage + 1;

            this.setState({
              posts: updatedPosts,
              page: nextPage,
            });
        });
    }

    updatePostModal(post){
        Request
            .get('user/' + post.ownerID)
            .end((err, res)=>{
                if(err){
                    console.log("Error: " + err);
                }
                else{
                    this.setState({
                        postModal: <PostModal
                            title={post.title}
                            price={post.price}
                            address={post.address}
                            description={post.description}
                            thumbnail={post.thumbnail}
                            images={post.images}
                            email={res.body.email} />
                    });
                }
            });

        //display the modal on the screen
        $('#postModal').modal('open');
    }

    handlePagination(e){
        e.preventDefault();
        this.requestAllPosts(this.state.page);
    }

    handleCloseModal(){
        $('.floatingBackButton').addClass('hide');
        $('.modal').modal('close');
    }

    render(){
        console.log('MainPage rendering... posts: ' + JSON.stringify(this.state.posts));

        //fetch posts and place them within PostTile's
        var postTiles = this.state.posts.map((post, index) =>
            <PostTile key={index} updatePostModal={this.updatePostModal} post={post} />);

        //determine if pagination button is needed, or if we've reached the end of all posts
        var paginationButton = null;
        if (this.state.page == 0)
            paginationButton = <h4>Reached end of posts.</h4>;
        else
            paginationButton = <a onClick={this.handlePagination} className="scrollButton btn-floating btn-large waves-effect waves-light gray">
                                    <i className="material-icons">expand_more</i></a>;

        return(
            <div className="app-content row center">
                <Banner />
                {postTiles}
                <br />
                {paginationButton}

                <FloatingBackButton closeModal={this.handleCloseModal} />
                {this.state.postModal}
            </div>
        );
    }
}