import React from 'react';
import Banner from './Banner';
import PostTile from './PostTile';
import PostModal from './PostModal';
import FloatingBackButton from './FloatingBackButton';

export default class MainPage extends React.Component {
    constructor(props){
        super(props);

        //define state variable holding data for <PostModal>
        this.state = {
            postModal: <PostModal title="" price="" address="" description="" />,
        };

        //bind function to this component
        this.updatePostModal = this.updatePostModal.bind(this);
    }

    componentDidMount(){
        // Initialize Post Modals
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

        // Set up click handler for floating back button
        $('.floatingBackButton').click(function(){
            $('.floatingBackButton').addClass('hide');
            $('.modal').modal('close');
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
        var postTiles = this.props.posts.map((post, index) =>
            <PostTile key={index} updatePostModal={this.updatePostModal} post={post} />);

        console.log('MainPage rendering... posts: ' + this.props.posts);
        return(
            <div className="app-content row center">
                <Banner />
                {postTiles}
                <br />
                <a onClick={this.props.requestPosts} className="scrollButton btn-floating btn-large waves-effect waves-light gray">
                    <i className="large material-icons">expand_more</i>
                </a>

                <FloatingBackButton />
                {this.state.postModal}
            </div>
        );
    }
}