import React from 'react';
import { Navigator, BackAndroid } from 'react-native';

import RepositoriesView from './components/RepositoriesView';
import RepositoryView from './components/RepositoryView';


export default class App extends React.Component {
	componentDidMount() {
		this.registerBackButton();
	}

	render() {
		return (
			<Navigator
				ref={(ref) => this.navigator = ref}
				initialRoute={{ path: '/repositories' }}
				renderScene={this.renderScene}
			/>
		);
	}

	renderScene = (route, navigator) => {
		switch (route.path) {
			case '/repositories':
				return <RepositoriesView navigator={navigator} />;
			case '/repository':
				return <RepositoryView navigator={navigator} repository={route.repository} />;
			default:
				throw 'route not found'
		}
	};


	registerBackButton = () => {
		BackAndroid.addEventListener('hardwareBackPress', this.onBackButton);
	};

	onBackButton = () => {
		this.navigator.pop();
		return this.navigator.getCurrentRoutes().length > 1 ? true : false;
	};
}