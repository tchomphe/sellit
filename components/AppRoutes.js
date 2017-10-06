'use strict';

import React from 'react';
import { BrowserRouter as Router, Route, Switch, hashHistory } from 'react-router-dom';

import Layout from './Layout';
import MainPage from './MainPage';
import PostCreationContainer from './PostCreationContainer';
import SearchResultsPage from './SearchResultsPage';
import MyPostsPage from './MyPostsPage';
import UserPostPage from './UserPostPage';
import MyAccountPage from './MyAccountPage';
import NotFoundPage from './NotFoundPage';
import Forgot from './Forgot';
import Reset from './Reset';
import PostTypePage from './PostTypePage'

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
          <NavigationHeader authorizedUser={this.state.user.authorized} />

          <Switch>
            <Route path="/" exact={true} render={() => (
              <MainPage posts={this.state.posts} page={this.state.page} />)} />
            <Route path="/search/:query" component={SearchResultsPage} />
            <Route path="/create-post" component={PostCreationContainer} />
            <Route path="/my-posts" component={MyPostsPage} />
            <Route path="/user-posts/:ownerId" component={UserPostPage} />
            <Route path="/forgot" component={Forgot} />            
            <Route path="/reset/:token" component={Reset} />  
            <Route path="/posts/:type" component={PostTypePage} />        
            <Route path="/my-account" render={() => (
              <MyAccountPage user={this.state.user} />)} />
            <Route component={NotFoundPage} />
          </Switch>

          <UserRegistrationModal />
          <UserLoginModal handleLogin={this.saveUser} />
        </Layout>
      </Router>
    );
  }
}