'use strict';

import React from 'react';
//import { Router, Route, IndexRoute} from 'react-router';
import { BrowserRouter as Router, Route, IndexRoute, browserHistory } from 'react-router-dom';

import Layout from './Layout';
import MainPage from './MainPage';
// import NotFoundPage from 'NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={MainPage}/>
  </Route>
);

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}