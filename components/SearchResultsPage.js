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
        $('.grid').masonry({
            // options
            itemSelector: '.grid-item',
            columnWidth: 320,
          });
    }

    searchPosts(query, currentPage){
        //show page loading wrapper
        $("#dim-page-loader").fadeIn(100);
        Request.get('/searchPosts/' + query + '/' + currentPage).then((res) => {
            //hide page loading wrapper
            $("#dim-page-loader").fadeOut(100);
            //check if current page is 1, if so, reset results -- otherwise, continue pagination
            var oldPosts = (currentPage == 1) ? [] : this.state.posts;
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
            paginationButton = <h4>Reached end of posts.</h4>;
        else
            paginationButton = <a onClick={this.handlePagination} className="btn-floating black">
                                    <i className="material-icons">expand_more</i></a>;

        return(
            <div className="container center-align">
                <div className="row">
                    <Masonry
                        className={'my-gallery-class'} // default ''
                        elementType={'div'} // default 'div'
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} //
                    >
                        {postTiles}
                    </Masonry>
                </div>
                <div className="row">
                    {(searchResult) ? paginationButton : null}
                </div>
            </div>
        )
    }
}