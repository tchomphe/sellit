import React from 'react';
import PropTypes from 'prop-types';
import PostTile from './PostTile';
import Request from 'superagent';
import Masonry from 'react-masonry-component';

export default class SearchResultsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            query: this.props.match.params.query,
            posts: [],
            page: 1,
            fetchInProgress:true,
        };

        //bind function to this component
        this.searchPosts = this.searchPosts.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
    }
    componentWillReceiveProps(nextProps){
        //update search results for each new query
        this.searchPosts(nextProps.match.params.query, 1);
    }

    componentDidMount(){
        //send request to initialize post listings
        this.searchPosts(this.state.query, this.state.page);
        $('.modal').modal();
    }

    searchPosts(query, currentPage){
        this.setState({fetchInProgress:true});
        //show page loading wrapper
        // $("#dim-page-loader").fadeIn(100);
        Request.get('/searchPosts/' + query + '/' + currentPage).then((res) => {
            //hide page loading wrapper
            // $("#dim-page-loader").fadeOut(100);
            //check if current page is 1, if so, reset results -- otherwise, continue pagination
            var oldPosts = (currentPage == 1) ? [] : this.state.posts;
            var newPosts = res.body.docs;
            var updatedPosts = oldPosts.concat(newPosts);

            //determine nextPage, if last page of results were encountered, set nextPage to 0
            var nextPage = (newPosts.length == 0) ? 0 : currentPage + 1;

            this.setState({
              posts: updatedPosts,
              page: nextPage,
              fetchInProgress: false,
            });
        });
    }

    handlePagination(e){
        e.preventDefault();
        this.searchPosts(this.state.query, this.state.page);
    }

    render(){
        console.log('SearchResultsPage rendering... posts: ');
        var searchResult = true;
        var postTiles;
        //fetch posts and place them within PostTile's
        if((this.state.posts).length == 0){
            postTiles = <h5>Sorry, we didn't find any result.</h5>;
            searchResult = false;
        } else {
            postTiles = this.state.posts.map((post, index) =>
            <PostTile key={index} postModalID={'postModal'+index} post={post} />)
        }
        //determine if pagination button is needed, or if we've reached the end of all posts
        var paginationButton = null;
        if (this.state.page == 0)
            paginationButton = <h5>Reached end of list.</h5>;
        else
            paginationButton = <a onClick={this.handlePagination} className="btn-floating black">
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
                        className={'row cards-container'} // default ''
                        elementType={'div'} // default 'div'
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} //
                    >
                        {postTiles}
                    </Masonry>
                <div className="row">
                    {(searchResult) ? (this.state.fetchInProgress ? spinner: paginationButton) : null}
                </div>
            </div>
        )}
}