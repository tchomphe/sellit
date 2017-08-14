'use strict';

import React from 'react';
import { BrowserRouter as Router, Route, hashHistory } from 'react-router-dom';

import Layout from './Layout';
import MainPage from './MainPage';
import PostCreationContainer from './PostCreationContainer';
import MyPostsPage from './MyPostsPage';
import MyAccountPage from './MyAccountPage';
// import NotFoundPage from 'NotFoundPage';

import Request from 'superagent';

export default class AppRoutes extends React.Component {
  constructor(props){
    super(props);

    //define state variables
    this.state = {
        posts: [],
        page: 1, //TODO: create logic for pagination
        user: {
          id: null, //TODO: decide how to populate user identification
          authorized: false,
        }
    };

    //bind functions to this component
    this.requestPosts = this.requestPosts.bind(this);
  }

  componentWillMount(){
    this.requestPosts();
    console.log('Finished initial population');
  }

  requestPosts(searchQuery = '.*'){
    //send GET request to API and update state with response
    Request.get('/searchByTitle/' + searchQuery).then((res) => {
        var oldPosts = [];//this.state.displayedPosts; //TODO: integrate pagination into searchByTitle
        var newPosts = res.body.docs;
        var updatedPosts = oldPosts.concat(newPosts);

        this.setState({
            posts: updatedPosts,
            user: { authorized: (res.header.authorized_user == 'true') }
        });
    });
  }

  render() {
    console.log('AppRoutes rendering... posts: ' + this.state.posts);
    return (
      <Router history={hashHistory}>
        <Layout>
          <Route exact={true} path="/" render={() => (<MainPage posts={this.state.posts} />)} />
          <Route path="/create-post" component={PostCreationContainer}/>
          <Route path="/my-posts" component={MyPostsPage}/>
          <Route path="/my-account" component={MyAccountPage}/>
        </Layout>
      </Router>
      );
    }
}