import React from 'react';
import PostTile from './PostTile';
import NavigationHeader from './NavigationHeader';
import RegistrationWindow from './RegistrationWindow';
import LoginWindow from './LoginWindow';
import PostWindow from './PostWindow';
import FloatingBackButton from './FloatingBackButton';
import Banner from './Banner';
import Request from 'superagent';

export default class TilesContainer extends React.Component {
    constructor(props){
        super(props);

        //define state variable holding data for Tiles
        this.state = {
            displayedPosts: [],
            page: 1,
        };
    }

    componentWillMount(){
        this.getPosts();
    }

    getPosts(e){
        if (e) {e.preventDefault();}

        //send GET request to API and update state with response
        Request.get('/paginatePosts/'+this.state.page).then((res) => {
            var oldPosts = this.state.displayedPosts;
            var newPosts = res.body.docs.map((post) =>
                    <PostTile key={post._id} id={post._id} title={post.title} address={post.address} />
                );
            var updatedPosts = oldPosts.concat(newPosts);

            this.setState({
                displayedPosts: updatedPosts,
                page: this.state.page + 1
            })
        });
    }

    searchPost(title){
        Request.get('/searchByTitle/' + title).then((res) => {
            this.setState({
                displayedPosts: res.body.docs.map((post) =>
                    <PostTile key={post._id} id={post._id} title={post.title} address={post.address} />
                ),
            })
        });
    }

    render(){
        return(
            <div className="app-content row center">
                <NavigationHeader searchPost={this.searchPost.bind(this)} getPosts={this.getPosts.bind(this)}/>
                <Banner />
                <RegistrationWindow />
                <LoginWindow />
                <PostWindow />
                {this.state.displayedPosts}
                <a onClick={(e) => (this.getPosts(e))} className="scrollButton btn-floating btn-large waves-effect waves-light gray">
                    <i className="large material-icons">expand_more</i>
                </a>
            </div>
        );
    }
}