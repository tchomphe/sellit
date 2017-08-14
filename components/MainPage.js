import React from 'react';
import PostTile from './PostTile';
import NavigationHeader from './NavigationHeader';
import RegistrationModal from './RegistrationModal';
import LoginModal from './LoginModal';
import PostModal from './PostModal';
import FloatingBackButton from './FloatingBackButton';
import Banner from './Banner';
import Request from 'superagent';

export default class MainPage extends React.Component {
    constructor(props){
        super(props);

        //bind functions to this component
        this.updatePostModal = this.updatePostModal.bind(this);
        this.requestPosts = this.requestPosts.bind(this);

        //define state variable holding data for <PostTile>'s and <PostModal>
        this.state = {
            postModal: <PostModal title="" price="" address="" description="" />,
            postTiles: this.props.posts.map((post) =>
                <PostTile updatePostModal={this.updatePostModal} post={post} key={post._id} id={post._id} title={post.title} address={post.address} />),
        };
    }

    componentWillMount(){

    }

    requestPosts(searchQuery = '.*'){
        //send GET request to API and update state with response
        Request.get('/searchByTitle/' + searchQuery).then((res) => {
            var oldPosts = [];//this.state.displayedPosts; //TODO: integrate pagination into searchByTitle
            var newPosts = res.body.docs.map((post) =>
                    <PostTile updatePostModal={this.updatePostModal} post={post} key={post._id} id={post._id} title={post.title} address={post.address} />
                );
            var updatedPosts = oldPosts.concat(newPosts);

            this.setState({
                displayedPosts: updatedPosts,
                page: this.state.page + 1,
                authorizedUser: (res.header.authorized_user == 'true'),
            })
        });
    }

    updatePostModal(post){
        //pass information about the (user-selected) post to the modal
        this.setState({
            postModal: <PostModal title={post.title} price={post.price} address={post.address} description={post.description} />
        });

        //display the modal on the screen
        $('#postModal').modal('open');
    }

    render(){
        console.log('Rendered MainPage ' + this.state.postTiles);
        return(
            <div className="app-content row center">
                <NavigationHeader authorizedUser={this.state.authorizedUser} searchPost={this.requestPosts} />
                <Banner />
                <FloatingBackButton />
                <RegistrationModal />
                <LoginModal />
                {this.state.postModal}
                {this.state.postTiles}
                <br />
                <a onClick={this.requestPosts} className="scrollButton btn-floating btn-large waves-effect waves-light gray">
                    <i className="large material-icons">expand_more</i>
                </a>
            </div>
        );
    }
}