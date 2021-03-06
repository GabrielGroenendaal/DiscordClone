import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/Root'
import * as util from './util/session_api_util'
import * as conversationUtil from './util/conversation_api_util'
document.addEventListener('DOMContentLoaded', () => {
      let store;
      if (window.currentUser) {
            const preloadedState = {
                  entities: {
                        users: { [window.currentUser.id]: window.currentUser }
                  },
                  session: { id: window.currentUser.id }
            };
            store = configureStore(preloadedState);
            delete window.currentUser;
      } else {
            store = configureStore();
      }
      // we don't put the store directly on the window because
      // it can be confusing when debugging, sometimes giving you access to state
      // when you shouldn't
      window.getState = store.getState;
      window.conversationUtil = conversationUtil;
      window.dispatch = store.dispatch; // just for testing!
      
      ReactDOM.render(<Root store={store} />, document.getElementById("root"));
      window.util = util;
})