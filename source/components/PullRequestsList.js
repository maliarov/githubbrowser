import moment from 'moment';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  View, ListView, Text, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  list: {
    width: '100%',
    padding: 5,
  },
  item: {
    paddingBottom: 10,
  },

  itemStateOpen: {
    color: 'green',
  },
  itemStateClose: {
    color: 'red',
  },
  itemStateDefault: {
    color: 'grey',
  },
  itemStatusIcon: {
    fontSize: 14,
    lineHeight: 16,
  },
  itemTitle: {
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 16,
    flexGrow: 1,
  },
  itemMisc: {
    paddingLeft: 20,
    color: '#aaa',
    fontSize: 10,
    fontStyle: 'italic',
  },
});

@connect(state => ({ pullRequest: state.pullRequests }), dispatch => ({ dispatch }))
class PullRequestsList extends React.Component {
  static propTypes = {
    dataSource: PropTypes.any,
  }

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
    const getIconStyle = () => (
      {
        open: styles.itemStateOpen,
        close: styles.itemStateClose,
      }[pullRequest.state] || styles.itemStateDefault
    );

    const getMiscText = () => (
      `#${pullRequest.number} opened by ${pullRequest.user.login} at ${moment(pullRequest.created_at).format('YYYY-MM-DD')}`
    );

    return (
      <View style={styles.item}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemStatusIcon}>
            <Icon style={getIconStyle()} name="circle" />
          </Text>
          <Text style={styles.itemTitle}>{pullRequest.title}</Text>
        </View>
        <Text style={styles.itemMisc}>{getMiscText()}</Text>
      </View>
    );
  };
}

export default PullRequestsList;
