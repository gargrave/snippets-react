import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import firebaseConfig from '../../../../src/etc/firebaseConfig';
import {fbToArray} from '../../../../src/modules/firebase/firebaseUtils';
import {snippets} from '../../../../src/modules/snippets/snippetsApiMock';
import SnippetsListPageDefault, {SnippetsListPage} from '../../../../src/modules/snippets/containers/SnippetsListPage';
import SnippetListDetail from '../../../../src/modules/snippets/components/SnippetListDetail';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const actions = {
  update: (snippet) => {}
};

const mockSnippets = fbToArray(snippets['0']);
const starredSnippets = mockSnippets.filter(s => s.starred);
const archivedSnippets = mockSnippets.filter(s => s.archived);

const store = mockStore({
  user: {
    email: 'something@somewhere.com'
  },
  snippets: mockSnippets
});


describe('<SnippetsListPage />', () => {

  it('should contain a list of all Snippets', () => {
    const wrapper = shallow(
      <SnippetsListPage
        loggedIn={true}
        actions={actions}
        snippets={mockSnippets}
        filterBy={''}
      />
    );

    expect(wrapper.find(SnippetListDetail)).to.have.length(mockSnippets.length);
  });

  it('should contain a list of starred Snippets', () => {
    const props = { params: { filterBy: 'starred' } };
    const wrapper = mount(
      <Provider store={store}>
        <SnippetsListPageDefault {...props} />
      </Provider>
    );

    expect(wrapper.find(SnippetListDetail)).to.have.length(starredSnippets.length);
  });

  it('should contain a list of archived Snippets', () => {
    const props = { params: { filterBy: 'archived' } };
    const wrapper = mount(
      <Provider store={store}>
        <SnippetsListPageDefault {...props} />
      </Provider>
    );

    expect(wrapper.find(SnippetListDetail)).to.have.length(archivedSnippets.length);
  });
});
