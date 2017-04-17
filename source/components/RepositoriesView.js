import React from 'react';

import { View, Text, ListView, StyleSheet } from 'react-native';

import RepositoriesList from './RepositoriesList';
import RepositoriesSearch from './RepositoriesSearch';
import Icon from 'react-native-vector-icons/FontAwesome';

import Theme from '../theme/index';

import GitHub from '../models/GitHub';

export default class RepositoriesView extends React.Component {

    constructor(props) {
        super(props);

        this.repositoriesDataSource =  new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            repositories: null,
			searchQuery: null
        };
    }

    componentDidMount() {
		this.fetch();
    }

    onSearch = (query) => {
    	if (this.state.searchQuery === query) {
    		return;
		}

    	this.setState({searchQuery: query}, () => {
			this.fetch(this.state.searchQuery);
		});
	};

    fetch = (query) => {
		GitHub.search
			.repositories({ q: query || 'stars:>0', s: 'stars', o: 'desc' })
			.then((repositories) =>
				this.setState({repositories: this.repositoriesDataSource.cloneWithRows(repositories.items)})
			);
	};

    render() {
		const itemsCount = this.state.repositories ? this.state.repositories.getRowCount() : null;

		return itemsCount > 0
			? this.renderItems()
			: itemsCount === null
				? this.renderLoading()
				: this.renderNoItems();
    }

	renderLoading = () =>
		<View style={styles.view}>
			<Text style={styles.text}><Icon name='spinner'/> Loading Repositories...</Text>
		</View>;

	renderNoItems = () =>
		<View style={styles.view}>
			<Text style={styles.text}>No Repositories</Text>
			<RepositoriesSearch value={this.state.searchQuery} onSearch={this.onSearch} />
		</View>;

	renderItems = () =>
		<View style={styles.view}>
			<RepositoriesList dataSource={this.state.repositories} onRepositoryPress={this.onRepositoryPress} />
			<RepositoriesSearch value={this.state.searchQuery} onSearch={this.onSearch} />
		</View>;


	onRepositoryPress = (repository) => {
        this.props.navigator.push({path: '/repository', repository});
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