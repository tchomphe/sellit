import React from 'react';
import Banner from './Banner';
import PostTile from './PostTile';
import Request from 'superagent';
import Masonry from 'react-masonry-component';

export default class MainPage extends React.Component {
    constructor(props){
        super(props);

        //define state variable holding data for <PostModal>
        this.state = {
            posts: [],
            page: 1,
            fetchInProgress: true
        };

        //bind function to this component
        this.handlePagination = this.handlePagination.bind(this);
    }

    componentDidMount(){
        //send request to initialize post listings
        this.requestAllPosts(1);
        $('.modal').modal();
    }

    requestAllPosts(currentPage){
        this.setState({fetchInProgress:true});
        Request.get('/paginatePosts/' + currentPage).then((res) => {
            var oldPosts = this.state.posts;
            var newPosts = res.body.docs;
            var updatedPosts = oldPosts.concat(newPosts);

            //determine nextPage, if last page of results were encountered, set nextPage to 0
            var nextPage = (newPosts.length == 0) ? 0 : currentPage + 1;

            this.setState({
              posts: updatedPosts,
              page: nextPage,
              fetchInProgress:false
            });
        });
    }

    handlePagination(e){
        e.preventDefault();
        this.requestAllPosts(this.state.page);
    }

    render(){
        console.log('MainPage rendering... posts: ');

        //fetch posts and place them within PostTile's
        var postTiles = this.state.posts.map((post, index) =>
            <PostTile key={index} postModalID={'postModal'+index} post={post} nextPostId={(index+1)} prevPostId={(index-1)} />);

        //determine if pagination button is needed, or if we've reached the end of all posts
        var paginationButton = null;
        if (this.state.page == 0)
            paginationButton = <h5>Reached end of list.</h5>;
        else
            paginationButton = <a onClick={this.handlePagination} className="btn-floating waves-effect waves-light black">
                                    <i className="material-icons">expand_more</i></a>;

        var spinner = <div className="preloader-wrapper active">
                <div className="spinner-layer spinner-black-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div><div className="gap-patch">
                    <div className="circle"></div>
                </div><div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
                </div>
            </div>

        return(
            <div className="container center-align">
                <Masonry
                    className={'row cards-container'}
                    elementType={'div'} // default 'div'
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false}
                >
                    {postTiles}
                </Masonry>
                <div className="row">
                    {this.state.fetchInProgress ? spinner: paginationButton}
                    {/* {paginationButton} */}
                </div>
            </div>
        );
    }
}