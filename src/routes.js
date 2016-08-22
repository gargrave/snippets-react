import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import HomePage from './modules/common/containers/HomePage';
import AboutPage from './modules/common/containers/AboutPage.js';
import NotFoundPage from './modules/common/containers/NotFoundPage.js';

import SnippetsListPage from './modules/snippets/containers/SnippetsListPage';
import SnippetCreatePage from './modules/snippets/containers/SnippetCreatePage';
import SnippetDetailPage from './modules/snippets/containers/SnippetDetailPage';

import AccountPage from './modules/account/containers/AccountPage';
import LoginPage from './modules/account/containers/LoginPage';
import CreateAccountPage from './modules/account/containers/CreateAccountPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={SnippetsListPage}/>

    <Route path="snippets" component={SnippetsListPage}/>
    <Route path="snippets/new" component={SnippetCreatePage}/>
    <Route path="snippets/:id" component={SnippetDetailPage}/>
    <Route path="snippets/filter/:filterBy" component={SnippetsListPage}/>

    <Route path="account" component={AccountPage}/>
    <Route path="account/login" component={LoginPage}/>
    <Route path="account/create" component={CreateAccountPage}/>

    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
