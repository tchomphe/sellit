import React from 'react';
import PropTypes from 'prop-types';
import PostTile from './PostTile';
import PostModal from './PostModal';
import Request from 'superagent';

export default class SearchResultsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            query: this.props.match.params.query,
            posts: [],
            page: 1,
            postModal: <PostModal title="" price="" address="" description="" />,
        };

        //bind function to this component
        this.searchPosts = this.searchPosts.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.searchPosts(nextProps.match.params.query, 1);
        // alert(nextProps);
        // console.log(nextProps);        
        // alert("Component will receive props!");
        // this.setState({
        //     query: this.nextProps.query,
        // });
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
        this.searchPosts(this.state.query, this.state.page);
    }

    searchPosts(query, currentPage){
        Request.get('/searchPosts/' + query + '/' + currentPage).then((res) => {
            
            var oldPosts = (currentPage=1) ? []:this.state.posts;
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

    updatePostModal(){
        //TODO: create and update modal
    }

    handlePagination(e){
        e.preventDefault();
        this.searchPosts(this.state.query, this.state.page);
    }

    render(){
        console.log('SearchResultsPage rendering... posts: ');

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
                <br /><br /><br /><br />
                {postTiles}
                <br />
                {paginationButton}
                {this.state.postModal}
            </div>
        )
    }
}