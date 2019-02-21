import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Image, View, ScrollView, Text, StyleSheet, Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hyperlink from 'react-native-hyperlink';

import PullRequestsList from './PullRequestsList';
import Counter from './Counter';

import Theme from '../theme';

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.globals.mainBackgroundColor,
  },

  scrollView: {},

  scrollViewContainer: {
    minHeight: '100%',
    backgroundColor: '#fff',
  },

  header: {
    justifyContent: 'flex-end',

    width: '100%',
    height: 110,
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 120,
    backgroundColor: Theme.globals.mainColor,
  },

  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },

  headerCounters: {
    color: '#fff',
    marginRight: 10,
  },

  headerCounterStar: {
    color: Theme.globals.icons.star.color,
  },

  body: {
    width: '100%',
    paddingTop: 25,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },

  bodyDescription: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
  },

  bodyDescriptionLink: {
    color: '#1452ff',
    textDecorationLine: 'underline',
  },

  bodyPullRequestsContainer: {
    marginBottom: 30,
  },

  bodyPullsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  avatar: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: 100,
    height: 100,

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowRadius: 10,
    shadowOpacity: 0.7,
    shadowColor: 'black',
    elevation: 2,

    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    backgroundColor: Theme.globals.mainColor,
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },
});

@connect(state => ({
  repositories: state.repositories,
  pullRequests: state.pullRequests,
}), dispatch => ({ dispatch }))
class RepositoryView extends React.Component {
  static propTypes = {
    repositories: PropTypes.object.isRequired,
    pullRequests: PropTypes.object.isRequired,
    repositoryId: PropTypes.string.isRequired,
  }

  render() {
    const { repositories, repositoryId } = this.props;
    const repository = repositories.itemsMap[repositoryId];

    return (
      <View style={styles.view}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}
              numberOfLines={2}
              ellipsizeMode='tail'
            >{repository.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Counter style={styles.headerCounters} iconStyle={styles.headerCounterStar} icon="star"
                count={repository.stargazers_count} />
              <Counter style={styles.headerCounters} icon="eye" count={repository.watchers_count} />
              <Counter style={styles.headerCounters} icon="exclamation-circle"
                count={repository.open_issues_count} />
            </View>
          </View>
          <View style={styles.body}>
            <Hyperlink
              style={styles.bodyDescription}
              linkStyle={styles.bodyDescriptionLink}
              onPress={url => Linking.openURL(url)}
            >
              <Text>{repository.description}</Text>
            </Hyperlink>
            {this.renderPulls()}
          </View>
          <View style={styles.avatar}>
            <Image style={styles.avatarImage} source={{ uri: repository.owner.avatar_url }} />
          </View>
        </ScrollView>
      </View>
    );
  }

  renderPulls = () => {
    const {
      pullRequests,
    } = this.props;

    if (pullRequests.isFetching) {
      return this.renderLoading();
    }

    const itemsCount = pullRequests.items
      ? pullRequests.items.getRowCount()
      : 0;

    return itemsCount > 0
      ? this.renderItems(pullRequests)
      : this.renderNoItems();
  };

  renderLoading = () => (
    <Text style={styles.bodyPullsHeader}>
      <Icon name='spinner' /> Loading Pulls...
    </Text>
  )

  renderNoItems = () => (
    <Text style={styles.bodyPullsHeader}>No Pulls</Text>
  )

  renderItems = ({ items }) => (
    <View style={styles.bodyPullRequestsContainer}>
      <Text style={styles.bodyPullsHeader}>Pulls</Text>
      <PullRequestsList dataSource={items} />
    </View>
  )
}

export default RepositoryView;
