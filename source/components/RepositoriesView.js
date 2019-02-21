import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import RepositoriesList from './RepositoriesList';
import RepositoriesSearch from './RepositoriesSearch';

import { fetch } from '../actions/repositories';
import { fetch as prsFetch } from '../actions/pullRequests';
import { navigate } from '../actions/navigation';

import Theme from '../theme';


const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.globals.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
  },
});

@connect(state => ({ repositories: state.repositories }), dispatch => ({ dispatch }))
class RepositoriesView extends React.Component {
  static propTypes = {
    repositories: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    const {
      repositories,
    } = this.props;

    if (repositories.isFetching) {
      return this.renderLoading();
    }

    const itemsCount = repositories.items
      ? repositories.items.getRowCount()
      : 0;

    return itemsCount > 0
      ? this.renderItems(repositories)
      : this.renderNoItems(repositories);
  }

  renderLoading = () => (
    <View style={styles.view}>
      <Text style={styles.text}>
        <Icon name='spinner' /> Loading Repositories...
      </Text>
    </View>
  );

  renderNoItems = repositories => (
    <View style={styles.view}>
      <Text style={styles.text}>No Repositories</Text>
      <RepositoriesSearch value={repositories.filters.query} onSearch={this.onSearch} />
    </View>
  );

  renderItems = repositories => (
    <View style={styles.view}>
      <RepositoriesList dataSource={repositories.items}
        onRepositoryPress={this.onRepositoryPress} />
      <RepositoriesSearch value={repositories.filters.query} onSearch={this.onSearch} />
    </View>
  );

  onSearch = (query) => {
    if (this.props.repositories.filters.query === query) {
      return;
    }

    fetch(query)(this.props.dispatch);
  };

  onRepositoryPress = (repository) => {
    this.props.dispatch(navigate(`/repositories/${repository.id}`));
    this.props.dispatch(prsFetch({ owner: repository.owner.id, repo: repository.id }));
  }
}

export default RepositoriesView;
