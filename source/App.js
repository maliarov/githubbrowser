import React from 'react';
import { AppRegistry, View, StatusBar, Navigator } from 'react-native';

import LoginView from './components/login/LoginView';

import RepositoriesView from './components/repositories/RepositoriesView';
import RepositoryView from './components/repositories/RepositoryView';


import testData from '../test/data.json';


export default class App extends React.Component {
	render() {
		return (
			<Navigator
				initialRoute={{ path: '/repository', repository: testData.items[0] }}
				renderScene={this.renderScene}
			/>
		);
	}

	renderScene = (route, navigator) => {
		switch (route.path) {
			case '/login':
				return <LoginView navigator={navigator} />
			case '/repositories':
				return <RepositoriesView navigator={navigator} />
			case '/repository':
				return <RepositoryView navigator={navigator} repository={route.repository} />
			default:
				throw 'route not found'
		}
	};
}