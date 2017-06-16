'use strict';

import React from 'react';
import { BrowserRouter as Router, Route, hashHistory } from 'react-router-dom';

import Layout from './Layout';
import TilesContainer from './TilesContainer';
import PostCreate from './PostCreate';
// import NotFoundPage from 'NotFoundPage';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Layout>
          <Route exact={true} path="/" component={TilesContainer}/>
          <Route path="/create-post" component={PostCreate}/>
        </Layout>
      </Router>
      );
    }
}