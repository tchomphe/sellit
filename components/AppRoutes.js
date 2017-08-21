'use strict';

import React from 'react';
import { BrowserRouter as Router, Route, hashHistory } from 'react-router-dom';

import Layout from './Layout';
import MainPage from './MainPage';
import PostCreationContainer from './PostCreationContainer';
import MyPostsPage from './MyPostsPage';
import MyAccountPage from './MyAccountPage';
// import NotFoundPage from 'NotFoundPage';

import RegistrationModal from './RegistrationModal';
import UserLoginModal from './UserLoginModal';
import NavigationHeader from './NavigationHeader';
import Request from 'superagent';

export default class AppRoutes extends React.Component {
  constructor(props){
    super(props);

    //define state variables
    this.state = {
      posts: [],
      page: 1, //TODO: create logic for pagination
      user: {
        email: null, //TODO: decide how to populate user identification
        nickname: null,
        phone: null,
        authorized: false,
      }
    };

    //bind functions to this component
    this.requestPosts = this.requestPosts.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  componentWillMount(){
    this.requestPosts();
    console.log('Finished initial population');
  }

  requestPosts(searchQuery = 'all posts'){
    //send GET request to API and update state with response
    Request.get('/searchPosts/' + searchQuery).then((res) => {
      var oldPosts = [];//this.state.displayedPosts; //TODO: integrate pagination into searchByTitle
      var newPosts = res.body.docs;
      var updatedPosts = oldPosts.concat(newPosts);

      this.setState({
        posts: updatedPosts,
        user: { authorized: (res.header.authorized_user == 'true') }
      });
    });
  }

  saveUser(authorizedUser){
    this.setState({
      user: {
        email: authorizedUser.email,
        nickname: (authorizedUser.nickname == 'null') ? '' : authorizedUser.nickname,
        phone: (authorizedUser.phone == 'null') ? '' : authorizedUser.phone,
        authorized: true,
      }
    });
  }

  render() {
    console.log('AppRoutes rendering... posts: ' + this.state.posts);
    return (
      <Router history={hashHistory}>
        <Layout>
          <NavigationHeader authorizedUser={this.state.user.authorized} searchPost={this.requestPosts} />

          <Route exact={true} path="/" render={() => (<MainPage posts={this.state.posts} />)} />
          <Route path="/create-post" component={PostCreationContainer} />
          <Route path="/my-posts" component={MyPostsPage} />
          <Route path="/my-account" render={() => (<MyAccountPage user={this.state.user} />)} />

          <RegistrationModal />
          <UserLoginModal handleLogin={this.saveUser} />
        </Layout>
      </Router>
      );
    }
}