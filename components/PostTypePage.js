import React from 'react';
import Request from 'superagent';
import PostModal from './PostModal';
import PostTile from './PostTile';
import { Link, withRouter } from 'react-router-dom';
import Masonry from 'react-masonry-component';

class PostTypePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            category: "",
            page: 1,
        }
        this.handlePagination = this.handlePagination.bind(this);
    }
    componentDidMount(){
        // Initiate Materialize Modal
        $('.modal').modal();

        // Populate PostTile's with current user's posts
        this.requestPosts(this.props.match.params.type, 1);
    }

    componentWillReceiveProps(nextProps){
            this.setState({
                posts: [],
            });
            this.requestPosts(nextProps.match.params.type, 1);
    }

    requestPosts(query, page){
        Request.get(`/postsByType/${query}/${page}`).then((res) => {
            var oldPosts = this.state.posts;
            var newPosts = res.body.docs;
            var updatedPosts = oldPosts.concat(newPosts);

            //determine nextPage, if last page of results were encountered, set nextPage to 0
            var nextPage = (newPosts.length == 0) ? 0 : page + 1;

            this.setState({
                posts: updatedPosts,
                page: nextPage,
              });
        });
    }
    handlePagination(e){
        e.preventDefault();
        this.requestPosts(this.props.match.params.type, this.state.page);
    }

    render(){
        console.log('UserPostPage rendering ...');
        var postTiles = this.state.posts.map((post, index) =>
        <PostTile key={index} postModalID={'postModal'+index} post={post} nextPostId={(index+1)} prevPostId={(index-1)} />);

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
                {paginationButton}
            </div>
        </div>
        )
    }
}

export default PostTypePage;
