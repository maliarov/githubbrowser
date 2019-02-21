import React from 'react';
import { Navigator, BackAndroid } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import reducers from './reducers';

import RepositoriesView from './components/RepositoriesView';
import RepositoryView from './components/RepositoryView';

import { fetch } from './actions/repositories';
import { navigate } from './actions/navigation';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

fetch()(store.dispatch);

export default class App extends React.Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.registerNavigation();
    this.registerBackButton();
  }

  componentWillUnmount() {
    this.unregisterNavigation();
    this.unregisterBackButton();
    this.navigator = null;
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{ path: '/repositories' }}
          renderScene={this.renderScene}
        />
      </Provider>
    );
  }

  renderScene = (route, navigator) => {
    this.navigator = navigator;

    if (route.path === '/repositories') {
      return <RepositoriesView />;
    } if (/\/repositories\/\d+/.test(route.path)) {
      const id = route.path.slice('/repositories/'.length);
      return <RepositoryView repositoryId={id} />;
    }

    throw new Error('route not found');
  };


  registerBackButton = () => {
    const handler = () => {
      if (this.navigator) {
        const routes = this.navigator.getCurrentRoutes();
        if (routes.length > 1) {
          store.dispatch(navigate(routes[routes.length - 2].path));
          return true;
        }
      }

      return false;
    };

    BackAndroid.addEventListener('hardwareBackPress', handler);

    this.unregisterBackButton = () => {
      BackAndroid.removeEventListener('hardwareBackPress', handler);
      this.unregisterBackButton = null;
    };
  };


  registerNavigation = () => {
    const unsubscribe = store.subscribe(() => {
      const routes = this.navigator.getCurrentRoutes();
      const route = { path: store.getState().navigation.path };

      if (routes.length) {
        const currentPath = routes[routes.length - 1].path;
        if (currentPath !== route.path) {
          const matchedRoute = routes.find(r => r.path === route.path);
          if (matchedRoute) {
            const index = routes.indexOf(matchedRoute);
            this.navigator.popN(routes.length - index - 1);
            return;
          }
          this.navigator.push(route);
        }
      } else {
        this.navigator.push(route);
      }
    });

    this.unregisterNavigation = () => {
      unsubscribe();
      this.unregisterNavigation = null;
    };
  };
}
