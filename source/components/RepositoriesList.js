import React from 'react';

import {Image, ListView, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Counter from './Counter';

import Theme from '../theme/index';

export default class RepositoriesList extends React.Component {

	render() {
		return (
			<ListView
				contentContainerStyle={styles.list}
				dataSource={this.props.dataSource}
				renderRow={this.renderRow}
			/>
		);
	}

	renderRow = (repository) => {
		return (
			<TouchableOpacity style={styles.item}
							  onPress={() => this.props.onRepositoryPress && this.props.onRepositoryPress(repository)}>
				{renderAvatar()}
				<View style={styles.itemBody}>
					<View style={styles.itemBodyTextContainer}>
						<Text style={styles.itemBodyText}>{repository.name}</Text>
						<Counter style={styles.itemBodyText} iconStyle={styles.itemBodyStarIcon} icon="star"
								 count={repository.stargazers_count}/>
						<Counter style={styles.itemBodyText} icon="eye" count={repository.watchers_count}/>
						<Counter style={styles.itemBodyText} icon="exclamation-circle"
								 count={repository.open_issues_count}/>
					</View>
				</View>
			</TouchableOpacity>
		);


		function renderAvatar() {
			return repository.owner.avatar_url &&
				<Image style={styles.itemBackgroundImage} source={{uri: repository.owner.avatar_url}}/>
		}
	};

}

const styles = StyleSheet.create({
	list: {
		width: '100%',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	item: {
		backgroundColor: '#CCC',
		width: '33.33%',
		height: 200
	},

	itemBackgroundImage: {
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		position: 'absolute'
	},

	itemBody: {
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		position: 'absolute',
		backgroundColor: 'rgba(0,0,0,0)',
	},

	itemBodyTextContainer: {
		width: '100%',
		height: '100%',
		padding: 5,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'flex-start'
	},
	itemBodyText: {
		color: '#fff',
		textShadowRadius: 10,
		textShadowOffset: {width: 1, height: 1},
		textShadowColor: '#000'
	},
	itemBodyStarIcon: {
		color: Theme.globals.icons.star.color
	}
});