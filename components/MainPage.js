import React from 'react';
import Banner from './Banner';
import PostTile from './PostTile';
import Request from 'superagent';

export default class MainPage extends React.Component {
    constructor(props){
        super(props);

        //define state variable holding data for <PostModal>
        this.state = {
            posts: [],
            page: 1,
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
            paginationButton = <h4>Reached end of posts.</h4>;
        else
            paginationButton = <a onClick={this.handlePagination} className="btn-floating waves-effect waves-light blue">
                                    <i className="material-icons">expand_more</i></a>;

        return(
            <div className="app-content row center">
                <Banner />
                {postTiles}
                <br />
                {paginationButton}
            </div>
        );
    }
}