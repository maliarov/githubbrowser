import moment from 'moment';

import React from 'react';

import {View, ListView, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Theme from '../theme/index';

export default class PullRequestsList extends React.Component {

	render() {
		return (
			<ListView
				style={styles.list}
				contentContainerStyle={styles.list}
				dataSource={this.props.dataSource}
				renderRow={this.renderPullRequestRow}
			/>
		);
	}

	renderPullRequestRow = (pullRequest) => {
		return (
			<View style={styles.item}>
				<View style={{flexDirection: 'row'}}>
					<Text style={styles.itemStatusIcon}><Icon style={getIconStyle()} name="circle"/></Text>
					<Text style={styles.itemTitle}>{pullRequest.title}</Text>
				</View>
				<Text style={styles.itemMisc}>{getMiscText()}</Text>
			</View>
		);


		function getIconStyle() {
			const style = {
				'open': styles.itemStateOpen,
				'close': styles.itemStateClose
			}[pullRequest.state];

			return style || styles.itemStateDefault;
		}

		function getMiscText() {
			return `#${pullRequest.number} opened by ${pullRequest.user.login} at ${moment(pullRequest.created_at).format('YYYY-MM-DD')}`;
		}
	};
}

const styles = StyleSheet.create({
	list: {
		width: '100%',
		padding: 5
	},
	item: {
		paddingBottom: 10
	},

	itemStateOpen: {
		color: 'green'
	},
	itemStateClose: {
		color: 'red'
	},
	itemStateDefault: {
		color: 'grey'
	},
	itemStatusIcon: {
		fontSize: 14,
		lineHeight: 16,
	},
	itemTitle: {
		marginLeft: 5,
		fontSize: 14,
		lineHeight: 16,
		flexGrow: 1
	},
	itemMisc: {
		paddingLeft: 20,
		color: '#aaa',
		fontSize: 10,
		fontStyle: 'italic'
	}
});