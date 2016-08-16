import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';

import SnippetsListPage from './modules/snippets/containers/SnippetsListPage';

import HomePage from './modules/common/containers/HomePage';
import AboutPage from './modules/common/containers/AboutPage.js';
import NotFoundPage from './modules/common/containers/NotFoundPage.js';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={SnippetsListPage}/>

    <Route path="snippets" component={SnippetsListPage}/>

    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
