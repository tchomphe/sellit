'use strict';

import React from 'react';
import { BrowserRouter as Router, Route, hashHistory } from 'react-router-dom';

import Layout from './Layout';
import MainPage from './MainPage';
import PostCreationContainer from './PostCreationContainer';
import SearchResultsPage from './SearchResultsPage';
import MyPostsPage from './MyPostsPage';
import MyAccountPage from './MyAccountPage';
// import NotFoundPage from 'NotFoundPage';

import UserRegistrationModal from './UserRegistrationModal';
import UserLoginModal from './UserLoginModal';
import NavigationHeader from './NavigationHeader';
import Request from 'superagent';

export default class AppRoutes extends React.Component {
  constructor(props){
    super(props);

    //define state variables
    this.state = {
      posts: [],
      page: 1,
      user: {
        email: null,
        nickname: null,
        phone: null,
        authorized: false,
      }
    };

    //bind functions to this component
    this.requestPosts = this.requestPosts.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  componentDidMount(){
    //varify if the current user is authenticated
    Request.get('/varifyAuthentication').then((res) => {
      console.log('USER: ' + JSON.stringify(res.header.user));
      if(res.header.user){
        //parse user data into array, and then save as object in the state
        let userArr = res.header.user.split(', ');
        this.setState({
          user: { email: userArr.shift(), nickname: userArr.shift(), phone: userArr.shift(), authorized: true }
        });
      }
    });
  }

  requestPosts(searchQuery = 'all_posts', currentPage = 1){
    //send GET request to API and update state with response
    Request.get('/searchPosts/' + searchQuery + '/' + currentPage).then((res) => {
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
    console.log('AppRoutes rendering... ');

    return (
      <Router history={hashHistory}>
        <Layout>
          <NavigationHeader authorizedUser={this.state.user.authorized} searchPost={this.requestPosts} />

          <Route exact={true} path="/" render={() => (
            <MainPage posts={this.state.posts} updatePosts={this.requestPosts} page={this.state.page} />)} />
          <Route path="/search/:query" component={SearchResultsPage} />
          <Route path="/create-post" component={PostCreationContainer} />
          <Route path="/my-posts" component={MyPostsPage} />
          <Route path="/my-account" render={() => (
            <MyAccountPage user={this.state.user} />)} />

          <UserRegistrationModal />
          <UserLoginModal handleLogin={this.saveUser} />
        </Layout>
      </Router>
    );
  }
}