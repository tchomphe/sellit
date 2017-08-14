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

        //define state variable holding data for <PostTile>'s and <PostModal>
        this.state = {
            postModal: <PostModal title="" price="" address="" description="" />,
            postTiles: [],
        };
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
        if (this.state.postTiles.length !== this.props.posts.length)
            this.setState({
                postTiles: this.props.posts.map((post) =>
                    <PostTile updatePostModal={this.updatePostModal} post={post} key={post._id} id={post._id} title={post.title} address={post.address} />),
            });

        console.log('MainPage rendering... posts: ' + this.props.posts);
        return(
            <div className="app-content row center">
                <NavigationHeader authorizedUser={this.props.authorization} searchPost={this.props.requestPosts} />
                <Banner />
                <FloatingBackButton />
                <RegistrationModal />
                <LoginModal />
                {this.state.postModal}
                {this.state.postTiles}
                <br />
                <a onClick={this.props.requestPosts} className="scrollButton btn-floating btn-large waves-effect waves-light gray">
                    <i className="large material-icons">expand_more</i>
                </a>
            </div>
        );
    }
}