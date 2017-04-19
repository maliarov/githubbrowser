import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import RepositoriesList from './RepositoriesList';
import RepositoriesSearch from './RepositoriesSearch';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as repositoriesActions from '../actions/repositories';
import * as navigationActions from '../actions/navigation';

import Theme from '../theme';

@connect(state => ({state: state.repositories}), (dispatch) => ({dispatch}))
export default class RepositoriesView extends React.Component {

	render() {
		if (this.props.state.isFetching) {
			return this.renderLoading();
		} else {
			const itemsCount = this.props.state.items
				? this.props.state.items.getRowCount()
				: 0;

			return itemsCount > 0
				? this.renderItems(this.props.state)
				: this.renderNoItems();
		}
	}

	renderLoading = () =>
		<View style={styles.view}>
			<Text style={styles.text}><Icon name='spinner'/> Loading Repositories...</Text>
		</View>;

	renderNoItems = () =>
		<View style={styles.view}>
			<Text style={styles.text}>No Repositories</Text>
			<RepositoriesSearch value={state.filters.query} onSearch={this.onSearch}/>
		</View>;

	renderItems = (state) =>
		<View style={styles.view}>
			<RepositoriesList dataSource={state.items}
							  onRepositoryPress={this.onRepositoryPress}/>
			<RepositoriesSearch value={state.filters.query} onSearch={this.onSearch}/>
		</View>;

	onSearch = (query) => {
		if (this.props.state.filters.query === query) {
			return;
		}

		repositoriesActions.fetch(query)(this.props.dispatch);
	};

	onRepositoryPress = (repository) => {
		this.props.dispatch(navigationActions.navigate('/repositories/' + repository.id));
	}
}

const styles = StyleSheet.create({
	view: {
		width: '100%',
		height: '100%',
		backgroundColor: Theme.globals.mainColor,
		justifyContent: 'center',
		alignItems: 'center'
	},

	text: {
		color: '#fff'
	}
});